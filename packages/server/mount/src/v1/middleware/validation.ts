// import { z, AnyZodObject, unknown } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject, ZodError } from "zod"
import { badRequest } from '@hapi/boom'


export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (error: any) {
    // if (error instanceof ZodError) {
    //   throw badRequest(error.message);
    // }
    // return badRequest(JSON.stringify(error));
    return error
  }
}

// export const validate = (schema: AnyZodObject) => (
//   req: Request, 
//   res: Response, 
//   next: NextFunction
//   ) => {
//     try {
//       const parsedObject = schema.safeParse({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//         headers: req.headers
//       })

//       next(parsedObject)
//     } catch (err: any){
//       console.log(err)
//       res.status(400).json(err.errors)
//     }
// }