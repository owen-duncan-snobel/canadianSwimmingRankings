import { NextFunction, Request, Response } from "express";
import redisClient from '../../libs/redis/redis'
import { ApiResponse } from "../../types/api";
import { GetAthleteSchema } from "../schemas/swimmers.schemas";
import { zParse } from "./validation";


export const athleteRedisKey = (id: number) => `athlete_${id}`

export const bestTimesRedisKey = (id: number) => `athlete_id_${id}_best_times`

export async function checkAthleteCache(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const { params } = await zParse(GetAthleteSchema, req)
    const { id } = params
     const cacheResults = await redisClient.get(athleteRedisKey(id))
      if (cacheResults){
      return res.json({
        status: "SUCCESS",
        data: cacheResults,
        message: ''
        // potentialy set cache header in future
      } as ApiResponse)
    }
    return next()
  } catch (err){
    console.log(err)
    return next(err)
  }  
}

export async function checkBestTimesCache(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const { params } = await zParse(GetAthleteSchema, req)
    const { id } = params
     const cacheResults = await redisClient.get(bestTimesRedisKey(id))
      if (cacheResults){
      return res.json({
        status: "SUCCESS",
        data: cacheResults,
        message: ''
        // potentialy set cache header in future
      } as ApiResponse)
    }
    return next()
  } catch (err){
    console.log(err)
    return next(err)
  } 
}