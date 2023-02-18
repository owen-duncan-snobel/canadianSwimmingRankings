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

const athleteDataRedisKey = (id: number) => `athleteData_${id}`

const setRedisKey = (key: string, data: any) => {
  redisClient.set(key, JSON.stringify(data), {
    EX: 60 * 60 * 24
  })
}

export const getAthletesService = async (id: number): Promise<Prisma.AthletesUncheckedCreateInput> => {
    const cached = await redisClient.get(athleteDataRedisKey(id))
    if (cached){
      const athleteData: AthleteData = JSON.parse(cached)
      return athleteData.athlete
    } 

    const athleteData = await getAthleteDataFromSwimRankings(id)

    const athlete = await prisma.athletes.findFirst({
      where: { athlete_id: id }
    })
    if (!athlete){
      const newAthlete = await createAthleteWithBestTimes(id, athleteData)
      const {best_times, ...athleteWithoutBestTimes} = newAthlete
      setRedisKey(athleteDataRedisKey(id), athleteData)
      return athleteWithoutBestTimes as Athletes
    }
    // update best times of swimmer
    updateBestTimes(id, athleteData)
    setRedisKey(athleteDataRedisKey(id), athleteData)
    return athlete
}

export const getBestTimesService = async (id: number): Promise<Prisma.BestTimesUncheckedCreateInput[]> => {
    const cached = await redisClient.get(athleteDataRedisKey(id))
    if (cached){
      const athleteData: AthleteData = JSON.parse(cached)
      return athleteData.bestTimes
    }

    const athleteData = await getAthleteDataFromSwimRankings(id)

    const bestTimes = await prisma.bestTimes.findMany({
      where: { athlete_id: id }
    })
    // if you have no best times no athleteId would exist
    if (!bestTimes){
      const newAthlete = await createAthleteWithBestTimes(id, athleteData)
      setRedisKey(athleteDataRedisKey(id), athleteData)
      const bestTimes = newAthlete.best_times
      return bestTimes
    }

    // update best times of swimmer
    updateBestTimes(id, athleteData)
    setRedisKey(athleteDataRedisKey(id), athleteData)
    return bestTimes
}

const getAthleteDataFromSwimRankings = async (id: number) => {
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

const createAthleteWithBestTimes = async (id: number, athleteData: AthleteData) => {
  const athlete = await prisma.athletes.create({
    data: {
      ...athleteData.athlete,
      athlete_id: id,
      best_times: {
        create: athleteData?.bestTimes
      },
    },
     include: {
      best_times: true
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
