import { PrismaClient, BestTimes } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'
import * as cheerio from 'cheerio'

const prisma = new PrismaClient()
//const redisClient = redis.createClient()

export const getAthlete = async (id: number) => {
  try {
    let athlete
    // check redis cache 
    if (athlete) return athlete
    // check db
    athlete = await prisma.users.findFirst({
      where: { id }
    })
    if (athlete){
      // set cache
      return athlete
    } 
    // if not in db attempt to fetch from swimrankings.net
    athlete = await getAthleteFromSwimRankings(id)
    if (athlete){
      
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

type BestTimesWithoutId = Omit<BestTimes, 'id'>

const getAthleteFromSwimRankings = async (id: number) => {
  try {
    // need to parse the dom and select the rows from the table
    /// html/body/div[34]/table/tbody/tr/td/table[2]      xpath
    if (!id) throw Error('Missing id')
    const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`)
    const data = response.data
    const $ = cheerio.load(data)
    const bestTimes: BestTimesWithoutId[] = []
    $('.athleteBest > tbody > tr')
      .each((index, el) => {
        const event = $(el).find('td.event').text()
        const course =  $(el).find('td.course').text()
        const time =  $(el).find('td.time').text()
        const code =  $(el).find('td.code').text()
        const date =  $(el).find('td.date').text() as unknown as Date
        const city =  $(el).find('td.city').text()
        const meet_name =  $(el).find('td.name').text()
        bestTimes.push({
          athlete_id: id,
          course,
          time,
          date,
          event,
          location: city,
          meet_name,
          points: +code,
        })
    })
    return bestTimes
  } catch (error){
    console.log(error)
    return null
  }
}