import { NextFunction, Request, Response } from 'express'
import { ApiResponse, ResponseError } from '../../types/api'
import { zParse } from '../middleware/validation'
import { GetAthleteSchema } from '../schemas/swimmers.schemas'
import { getAthlete } from '../services/swimmers.services'

const getSwimmer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await zParse(GetAthleteSchema, req)
    const { athleteId } = params
    const athlete = await getAthlete(athleteId)
    return res.status(200).json({
      status: 'SUCCESS',
      ...athlete,
      message: ''
    } as ApiResponse)
  } catch (err){
    console.log(err)
    return next(err)
  }
}

module.exports = {
  getSwimmer
}
