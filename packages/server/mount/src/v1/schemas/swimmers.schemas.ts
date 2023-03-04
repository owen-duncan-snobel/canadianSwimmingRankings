import { z } from 'zod'

export const GetAthleteSchema = z.object({
  params: z.object({
    id: z.coerce.number({
      required_error: 'Athlete id is required',
      invalid_type_error: 'Athlete id must be a number'
    })
      .int({ message: 'Athlete id must be an integer'})
      .positive({ message: 'Athlete id must be a positive integer'})
  })
})
