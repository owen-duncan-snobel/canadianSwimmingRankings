import { PrismaClient, BestTimes } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'
import * as cheerio from 'cheerio'
import { parse } from 'date-fns'

type BestTimesWithoutId = Omit<BestTimes, 'id' | 'athlete_id'> 

const prisma = new PrismaClient()
//const redisClient = redis.createClient()

export const getAthlete = async (id: number) => {
  try {
    let athlete: BestTimesWithoutId[] | null = null
    // check redis cache 
    if (athlete) return athlete
    // // check db
    // athlete = await prisma.users.findFirst({
    //   where: { id }
    // })
    // if (athlete){
    //   // set cache
    //   return athlete
    // } 
    // if not in db attempt to fetch from swimrankings.net
    athlete = await getAthleteFromSwimRankings(id)
    if (athlete){
      const createAthlete = await prisma.users.create({
        data: {
          first_name: 'Owen',
          last_name: 'Duncan-Snobel',
          id,
          best_times: {
            create: athlete
          }
        }
      })
     //console.log(createAthlete)
    }

    // TODO need to also fetch name and birthdate to create the user 
    // need to differentiate between user and swimmer
    // user should probably be signed up to the site
    // swimmer is just searching for a swimmer from that site
    // each swimmer will have an athleteId which is associated to the best times
    // potentially let Users add there athleteId to there page to track / view there times
    return athlete
  } catch (error){
    console.log(error)
    return null
  }
}

const getAthleteFromSwimRankings = async (id: number) => {
  try {
    if (!id) throw Error('Missing id')
    const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`, {
      responseEncoding: 'binary'
    })
    const data = response.data
    const $ = cheerio.load(data)
       return $('.athleteBest > tbody > tr:gt(0)')
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
  } catch (error){
    console.log(error)
    return null
  }
}
