import { PrismaClient, Prisma, Athletes, BestTimes } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'
import * as cheerio from 'cheerio'
import { parse } from 'date-fns'
import redisClient from '../../libs/redis/redis'
import { ResponseError } from '../../types/api'

const prisma = new PrismaClient()

interface AthleteData {
  athlete: Prisma.AthletesUncheckedCreateInput,
  bestTimes: Prisma.BestTimesUncheckedCreateInput[]
}

export const getAthlete = async (id: number): Promise<Athletes> => {
    const cached = await redisClient.get(`athlete_data_${id}`)
    if (cached) return JSON.parse(cached)

    const athlete = await prisma.athletes.findFirst({
      where: { athlete_id: id }
    })

    const athleteData = await getAthleteDataFromSwimRankings(id)

    if (!athleteData) throw (`Error: TEST ERROR: ${id} data`)

    if (!athlete){
      const newAthlete = await createAthlete(id, athleteData)
      redisClient.set(`athlete_data_${id}`, JSON.stringify(newAthlete), {
        EX: 60 * 60 * 24 // expire every day (inorder to update for new meets)
      })
      return newAthlete
    }

    const updatedTimes = await updateBestTimes(id, athleteData)
    if (!updatedTimes) throw Error('Error: unable to update')

    redisClient.set(`athlete_data_${id}`, JSON.stringify(athlete), {
      EX: 60 * 60 * 24 // expire every day (inorder to update for new meets)
    })
    return athlete
}

const getAthleteDataFromSwimRankings = async (id: number): Promise<AthleteData> => {
  if (!id) throw Error('Missing id')
  const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`, {
    responseEncoding: 'binary'
  })
  const data = response.data
  const $ = cheerio.load(data)

  // check if athlete exists
  const athleteDoesNotExists = $('.name').text().includes('Unknown athlete id.')
  if (athleteDoesNotExists){
      const err: ResponseError = new Error(`athleteId: '${id}' does not exist`)
      err.statusCode = 404
      throw err
  }

  const bestTimes = $('.athleteBest > tbody > tr:gt(0)')
    .map(function (i, el){
      return {
      course: $(el).find('td.course').text(),
      time: $(el).find('td.time').text(),
      // date is being encoded with \u00A0/ need to replace with regular space
      date:  parse($(el).find('td.date').text().replace(/\u00A0/g, ' '), 'dd MMM yyyy', new Date()),
      event: $(el).find('td.event').text(),
      location: $(el).find('td.city').text(),
      meet_name: $(el).find('td.name').text(),
      points: parseInt($(el).find('td.code').text()) || null,
      athlete_id: id
    }}
  ).get()

  const [last_name, first_name] = $('#athleteinfo > #name')
    .text()
    .toUpperCase()
    .split(' ')
    .slice(0, 2)
    .join(' ')
    .split(',')

  const birth_year = parseInt($('#athleteinfo > #name')
    .text()
    .split('(')[1]
    .substring(0, 4))
    
  
  const get_gender = $('#athleteinfo > #name > img').attr('src')
  const gender = get_gender?.includes('gender1') 
    ? 'M' 
    : get_gender?.includes('gender2') 
      ? 'F'
      : ''

  const nation_club = $('#athleteinfo > #nationclub')
    .html()!
    .trim()
    .split('<br>')
    .slice(1)

  console.log('NATION:', nation_club)
  const nation = nation_club ? nation_club[0].split(' ')[0] : ''
  const club = nation_club && nation_club[1] ? nation_club[1] : ''

  console.log(`ATHLETE: ${id}, FIRSTNAME:${first_name}, LASTNAME: ${last_name}, GENDER: ${gender}, BIRTHYEAR: ${birth_year}, NATION: ${nation}, CLUB: ${club}`)

  return {
    athlete: {
      first_name,
      last_name,
      birth_year,
      club,
      gender,
      nation,
      athlete_id: id,
    },
    bestTimes
  }
}

const createAthlete = async (id: number, athleteData: AthleteData): Promise<Athletes> => {
  const athlete = await prisma.athletes.create({
    data: {
      ...athleteData.athlete,
      athlete_id: id,
      best_times: {
        create: athleteData?.bestTimes
      },
    }
  })
  return athlete
}

const updateBestTimes = async (id: number, athleteData: AthleteData): Promise<BestTimes[]> => {
  const updatedTimes = await prisma.$transaction(
  athleteData.bestTimes.map(bestTime => 
    prisma.bestTimes.update({
      where: {
        athlete_id_event_course: {
          athlete_id: id,
          event: bestTime.event,
          course: bestTime.course
        }
      },
      data: {
        ...bestTime,
        athlete_id: id
      }
    }))
  )
  return updatedTimes
}