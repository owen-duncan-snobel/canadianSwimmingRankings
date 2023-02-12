import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAthlete = async (id: number) => {
  try {
    const athlete = await prisma.users.findFirst({
      where: { id }
    })
    return athlete
  } catch (error){
    console.log(error)
    return null
  }
}

