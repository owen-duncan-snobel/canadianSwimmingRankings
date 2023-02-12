import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import redis from 'redis'

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
    if (athlete) return athlete

    // if not in db attempt to fetch from swimrankings.net
    athlete = await getAthleteFromSwimRankings(id)

    return athlete
  } catch (error){
    console.log(error)
    return null
  }
}

const getAthleteFromSwimRankings = async (id: number) => {
  try {
    // need to parse the dom and select the rows from the table
    /// html/body/div[34]/table/tbody/tr/td/table[2]      xpath
    const response = await axios(`https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=${id}`)
    return response.data
    //const data = await response.json()
  } catch (error){
    console.log(error)
    return null
  }
}