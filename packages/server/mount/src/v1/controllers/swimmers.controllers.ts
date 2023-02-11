import { Request, Response } from 'express'
import { GetAthleteSchema } from '../schemas/swimmers.schemas'
import { getAthlete } from '../services/swimmers.services'

const getSwimmer = async (req: Request, res: Response ) => {
  try {
    const validate = GetAthleteSchema.safeParse(req)

    if (!validate.success){
      return res.status(400).json(validate.error)
    }

    const { athleteId } = validate.data.params

    const athlete = await getAthlete(athleteId)

    if (!athlete) {
      return res.status(404).json({
        status: 'ERROR',
        message: `athleteId: '${athleteId}' does not exist`
      })
    }
    return res.status(200).json({
      status: 'SUCCESS',
      ...athlete
    })

  } catch (err){
    console.log(err)
    return res.status(500)
  }
}

module.exports = {
  getSwimmer
}

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const createUser = async () => {
//   try {
//     const user = await prisma.users.create({
//       data: {
//         first_name: "Owen",
//         last_name: "Duncan-Snobel",
//         id: 4448782,
//         best_times: {
//           createMany: {
//             data: [
//               {
//                 event: '50m Freestyle',
//                 course: '50m',
//                 time: '29.85',
//                 points: 343,
//                 date: '2011-04-29T00:00:00.000Z',
//                 location: 'Etobicoke',
//                 meet_name: 'Dr. Raplh Hicken Invitational'
//               }
//             ]
//           }
//         }
//       }
//     })
//   } catch (err){
//     console.log(err)
//   }
// }

