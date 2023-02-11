import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async () => {
  try {
    const user = await prisma.users.create({
      data: {
        first_name: "Owen",
        last_name: "Duncan-Snobel",
        id: 4448782,
        best_times: {
          createMany: {
            data: [
              {
                event: '50m Freestyle',
                course: '50m',
                time: '29.85',
                points: 343,
                date: '2011-04-29T00:00:00.000Z',
                location: 'Etobicoke',
                meet_name: 'Dr. Raplh Hicken Invitational'
              }
            ]
          }
        }
      }
    })
  } catch (err){
    console.log(err)
  }
}

