import express from 'express'
import swimmers from './swimmers/swimmers.routes'

const router = express.Router()

router.use('/swimmers', swimmers)

export default router