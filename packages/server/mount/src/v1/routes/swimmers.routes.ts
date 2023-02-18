import express from 'express'
const controller = require('../controllers/swimmers.controllers')
const router = express.Router()

router.get('/:athleteId', controller.getSwimmersWithId)
router.get('/:athleteId/best_times', controller.getSwimmersBestTimes)

router.post('/')
router.delete('/')
router.patch('/')

export default router