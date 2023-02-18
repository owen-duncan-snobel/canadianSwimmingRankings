import { NextFunction, Request, Response } from 'express'
import { ApiResponse, ResponseError } from '../../types/api'
import { zParse } from '../middleware/validation'
import { GetAthleteSchema } from '../schemas/swimmers.schemas'
import { getBestTimesService, getAthletesService } from '../services/swimmers.services'

const getSwimmersWithId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await zParse(GetAthleteSchema, req)
    const { athleteId } = params
    const athlete = await getAthletesService(athleteId)
    return res.status(200).json({
      status: 'SUCCESS',
      data: athlete,
      message: ''
    } as ApiResponse)
  } catch (err){
    console.log(err)
    return next(err)
  }
}

const getSwimmersBestTimes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await zParse(GetAthleteSchema, req)
    const { athleteId } = params
    const best_times = await getBestTimesService(athleteId)
    return res.status(200).json({
      status: 'SUCCESS',
      data: best_times,
      message: ''
    } as ApiResponse)
  } catch (err){
    console.log(err)
    return next(err)
  }
}

module.exports = {
  getSwimmersWithId,
  getSwimmersBestTimes
}
