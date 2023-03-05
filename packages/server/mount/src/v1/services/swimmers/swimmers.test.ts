import prisma from '../../../libs/prisma/client'
import {expect, jest, test} from '@jest/globals'
import { BestTimes, Prisma, PrismaClient } from '@prisma/client'
import { createAthleteWithBestTimes, getAthleteDataFromSwimRankings } from './swimmers.services'
import { parse } from 'date-fns'

beforeAll(async () => {
  // create athelete and best times
  await prisma.athletes.createMany({
    data: [
      {
        athlete_id: 1,
        birth_year: 1990,
        club: 'OAK',
        first_name: 'Test',
        last_name: 'User',
        gender: 'M',
        nation: 'CAN',
        id: 1
      },
      {
        athlete_id: 2,
        birth_year: 1990,
        club: 'OAK',
        first_name: 'Test',
        last_name: 'User',
        gender: 'M',
        nation: 'CAN',
        id: 2
      }
    ],
  })

  await prisma.bestTimes.createMany({
    data: [
      {
        athlete_id: 1,
        course: 'SCM',
        date: new Date(),
        event: '50m Freestyle',
        location: 'Test Location',
        meet_name: 'Test Meet',
        time: '123',
      },
       {
        athlete_id: 1,
        course: 'LCM',
        date: new Date(),
        event: '50m Freestyle',
        location: 'Test Location',
        meet_name: 'Test Meet',
        time: '123',
      },
       {
        athlete_id: 1,
        course: 'SCM',
        date: new Date(),
        event: '50m Backstroke',
        location: 'Test Location',
        meet_name: 'Test Meet',
        time: '123',
      }
    ]
  })
})


afterAll(async () => {
  const deleteAthletes = prisma.athletes.deleteMany()
  const deleteBestTimes = prisma.bestTimes.deleteMany()

  await prisma.$transaction([
    deleteBestTimes,
    deleteAthletes
])
  await prisma.$disconnect()
})

describe('Get Athlete Service', () => {
  
})

describe('Get Athlete Service', () => {
  
})

describe('Get athlete data from swimrankings', () => {
 it('Get old athlete data', async() => {
    const athleteAndBestTimes = {
      athlete: {
        athlete_id: 4100001,
        first_name: 'ROBIN',
        last_name: 'DELAFOSSE',
        birth_year: 1992,
        gender: 'M',
        club: 'Lot',
        nation: 'FRA',
      } as Prisma.AthletesCreateInput,
      bestTimes: [] as Prisma.BestTimesCreateManyAthleteInput[]
    }
    const data = await getAthleteDataFromSwimRankings(4100001)

    expect(athleteAndBestTimes).toEqual(data)
 }) 

 it('Get newer athlete data', async() => {
  const athleteAndBestTimes = {
      athlete: {
        athlete_id: 4448779,
        first_name: 'RASMUS',
        last_name: 'NIEMINEN',
        birth_year: 1997,
        gender: 'M',
        club: 'Motala SS',
        nation: 'SWE',
      } as Prisma.AthletesCreateInput,
      bestTimes: [
        {
          event: '25m Freestyle',
          course: '25m',

        }
      ] as Prisma.BestTimesCreateManyAthleteInput[]
    }
    const data = await getAthleteDataFromSwimRankings(4100001)

    expect(athleteAndBestTimes).toEqual(data)
 })

 it('athlete does not exist', async() => {
  
 }) 
})

describe('Create athlete with best times', () => {
  it('Create athlete with best times', async () => {
    const athlete: Prisma.AthletesCreateInput = {
      athlete_id: 3,
      birth_year: 1990,
      club: 'OAK',
      first_name: 'Test',
      last_name: 'User',
      gender: 'M',
      nation: 'CAN',
    }

    const bestTimes: Prisma.BestTimesCreateManyAthleteInput[] = [
      {
        course: '25m',
        date: new Date(),
        event: '50m Freestyle',
        location: 'Test Location',
        meet_name: 'Test Meet',
        time: '123',
      },
       {
        course: '50m',
        date: new Date(),
        event: '50m Freestyle',
        location: 'Test Location',
        meet_name: 'Test Meet',
        time: '123',
      },
    ]

    const createAthlete = await createAthleteWithBestTimes(3, athlete, bestTimes)

    const findAthlete = await prisma.athletes.findFirst({
      where: { athlete_id: athlete.athlete_id},
      include: {
        best_times: true
      }
    })
    expect(findAthlete).toEqual(createAthlete)

  })
})