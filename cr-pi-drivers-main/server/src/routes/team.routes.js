const {Router} = require('express')

const router = Router()

const {getTeams} = require('../controllers/teams.controller.js')
const {getTeamsHandler} = require('../handlers/teams.handler.js')

router.get('/teams', getTeamsHandler)


module.exports = router;