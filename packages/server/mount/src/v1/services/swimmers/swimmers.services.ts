import { Prisma, Athletes, BestTimes } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'
import * as cheerio from 'cheerio'
import { parse } from 'date-fns'
import redisClient from '../../../libs/redis/redis'
import { ResponseError } from '../../../types/api'
import { athleteRedisKey, bestTimesRedisKey } from '../../middleware/check_cache'
import prisma from '../../../libs/prisma/client'

// export interface AthleteData {
//   athlete: Prisma.AthletesCreateInput
//   bestTimes: BestTimes[]
// }

const setRedisKey = (key: string, data: any) => {
  redisClient.set(key, JSON.stringify(data), {
    EX: 60 * 60 * 24
  })
}

export const getAthletesService = async (id: number) => {
    const data = await getAthleteDataFromSwimRankings(id)

    const athlete = await prisma.athletes.findFirst({
      where: { athlete_id: id }
    })
    if (!athlete){
      const newAthlete = await createAthleteWithBestTimes(id, data.athlete, data.bestTimes)
      const {best_times, ...athleteWithoutBestTimes} = newAthlete
      setRedisKey(athleteRedisKey(id), athleteWithoutBestTimes)
      return athleteWithoutBestTimes as Athletes
    }
    // TODO update best times of swimmer (done via queue / job)
    // updateBestTimes(id, athleteData)
    setRedisKey(athleteRedisKey(id), athlete)
    return athlete
}

export const getBestTimesService = async (id: number): Promise<BestTimes[]> => {
  const data = await getAthleteDataFromSwimRankings(id)

  const bestTimes = await prisma.bestTimes.findMany({
    where: { athlete_id: id }
  })

  // if you have no best times no athleteId would exist
  if (!bestTimes){ // BUG this should work with just !, need to double check the typeof
    const newAthlete = await createAthleteWithBestTimes(id, data.athlete, data.bestTimes)
    const bestTimes = newAthlete.best_times
    return bestTimes
  }

  //await updateBestTimes(id, data.bestTimes as BestTimes[]) // use a queue to run this tasks in the background (the result of this should have no effect on the route)
  return bestTimes
}

export const getAthleteDataFromSwimRankings = async (id: number): Promise<{
  athlete: Prisma.AthletesCreateInput,
  bestTimes: Prisma.BestTimesCreateManyAthleteInput[]
}> => {
  if (!id) throw Error('Missing id')
  const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`, {
    responseEncoding: 'binary'
  })
  const data = response.data
  const $ = cheerio.load(data)

  // check if athlete exists
  const athleteDoesNotExists = $('.name').text().includes('Unknown athlete id.')
  if (athleteDoesNotExists){
      const err: ResponseError = new Error(`Athlete id: '${id}' does not exist`)
      err.statusCode = 404
      throw err
  }

  const bestTimes = $('.athleteBest > tbody > tr:gt(0)')
    .map(function (i, el){
      return {
      course: $(el).find('td.course').text().trim(),
      time: $(el).find('td.time').text().trim(),
      // date is being encoded with \u00A0/ need to replace with regular space
      date:  parse($(el).find('td.date').text().replace(/\u00A0/g, ' '), 'dd MMM yyyy', new Date()),
      event: $(el).find('td.event').text().trim(),
      location: $(el).find('td.city').text().trim(),
      meet_name: $(el).find('td.name').text().trim(),
      points: parseInt($(el).find('td.code').text().trim()) || null,
    }}
  ).get()

  const [last_name, first_name] = $('#athleteinfo > #name')
    .text()
    .toUpperCase()
    .split(' ')
    .slice(0, 2)
    .join(' ')
    .split(',')
    .map(name => name.trim())

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
    } as Prisma.AthletesCreateInput,
    bestTimes: bestTimes as Prisma.BestTimesCreateManyAthleteInput[]
  }
}

export const createAthleteWithBestTimes = async (
  id: number, 
  athlete: Prisma.AthletesCreateInput,
  bestTimes: Prisma.BestTimesCreateManyAthleteInput[]
): Promise<Athletes & { best_times: BestTimes[] }> => {
  const createAthlete = await prisma.athletes.create({
    data: {
      ...athlete,
      athlete_id: id,
      best_times: {
        create: bestTimes
      }
    },
    include: {
      best_times: true
    }
  })
  return createAthlete
}

export const updateBestTimes = async (id: number, data: BestTimes[]): Promise<BestTimes[]> => {
  const updatedTimes: BestTimes[] = await prisma.$transaction(
  data.map((bestTime): any => 
    prisma.bestTimes.update({
      where: {
        athlete_id_event_course: {
          athlete_id: id,
          event: bestTime.event as string,
          course: bestTime.course as string
        }
      },
      data: {
        athlete_id: id,
        course: bestTime.course,
        date: bestTime.date,
        event: bestTime.event,
        location: bestTime.location,
        points: bestTime.points,
        meet_name: bestTime.meet_name,
        time: bestTime.time
      },
    }))
  )
  return updatedTimes
}
