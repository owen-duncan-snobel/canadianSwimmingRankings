import express from 'express'
import { checkAthleteCache, checkBestTimesCache } from '../../middleware/check_cache'
const controller = require('../../controllers/swimmers/swimmers.controllers')
const router = express.Router()

router.get('/:id', checkAthleteCache, controller.getSwimmersWithId)
router.get('/:id/best_times', checkBestTimesCache, controller.getSwimmersBestTimes)

router.post('/')
router.delete('/')
router.patch('/')

export default router