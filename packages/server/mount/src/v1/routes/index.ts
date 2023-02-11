import express from 'express'
import swimmers from './swimmers.routes'

const router = express.Router()
router.use('/swimmers', swimmers)

export default router