import { PrismaClient, BestTimes, Athletes } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'
import * as cheerio from 'cheerio'
import { parse } from 'date-fns'
import redisClient from '../../libs/redis/redis'

type BestTimesWithoutId = Omit<BestTimes, 'id' | 'athlete_id'> 
type AthletesWithoutId = Omit<Athletes, 'id' | 'athlete_id' | 'bestTimes'>

const prisma = new PrismaClient()
//const redisClient = redis.createClient()

interface AthleteData {
  athlete: AthletesWithoutId,
  bestTimes: BestTimesWithoutId[]
}

export const getAthlete = async (id: number) => {
  try {
    const cached = await redisClient.get(`athlete_data_${id}`)
    if (cached) return JSON.parse(cached)

    const athlete = await prisma.athletes.findFirst({
      where: { athlete_id: id }
    })

    redisClient.set(`athlete_data_${id}`, JSON.stringify(athlete), {
      EX: 60 * 60 * 24 // expire every day (inorder to update for new meets)
    })

    // if not in db attempt to fetch from swimrankings.net
    const athleteData = await getAthleteDataFromSwimRankings(id)
    if (!athleteData) throw (`Error: Unable to get Athlete: ${id} data`)

    if (!athlete){
      const createAthlete = await prisma.athletes.create({
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
      return createAthlete
    }

    const updatedAthleteBestTimes = await prisma.$transaction(
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
          },
          include: {
            athlete: true
          }
        }))
      )
      
      return updatedAthleteBestTimes
  } catch (error){
    console.log(error)
    return null
  }
}

const getAthleteDataFromSwimRankings = async (id: number): Promise<AthleteData | null> => {
  try {
    if (!id) throw Error('Missing id')
    const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`, {
      responseEncoding: 'binary'
    })
    const data = response.data
    const $ = cheerio.load(data)

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
    const nation = nation_club[0].split(' ')[0]
    const club = nation_club[1]

    console.log(`
      ATHLETE: ${id}, FIRSTNAME:\ 
      ${first_name}, LASTNAME: ${last_name},\ 
      GENDER: ${gender}, BIRTHYEAR: ${birth_year},\ 
      NATION: ${nation}, CLUB: ${club}\
    `)

    console.log(bestTimes[0])

    return {
      athlete: {
        first_name,
        last_name,
        birth_year,
        club,
        gender,
        nation
      },
      bestTimes
    }
  } catch (error){
    console.log(error)
    return null
  }
}