import { z } from 'zod'

export const GetAthleteSchema = z.object({
  params: z.object({
    athleteId: z.coerce.number({
      required_error: 'AthleteId is required',
      invalid_type_error: 'AthleteId must be a number'
    })
      .int({ message: 'AthletedId must be an integer'})
      .positive({ message: 'AthleteId must be a positive integer'})
  })
})
