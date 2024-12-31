const express = require('express')

const{
  getClubs,
  createClub,
  deleteClub
} = require("../controllers/clubController")

const router = express.Router()

router.get('/',getClubs)

router.post('/',createClub)

router.delete('/:id',deleteClub)

module.exports=router