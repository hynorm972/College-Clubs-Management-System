const mongoose = require('mongoose')
const Club = require('../models/Club')
const multer = require('multer')

// Get all clubs
const getClubs = async (req, res) => {
    const clubs = await Club.find({});
    res.status(200).json(clubs);
}

// Create a new club
const createClub = async (req, res) => {
  const {name,description}= req.body
    try{
      const club = await Club.create({name,description})
      res.status(200).json(club)
    }catch(error){
      res.status(400).json({error:error.message})
    }
}

//delete a workout
const deleteClub = async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such club'})
  }
  const club = await Club.findOneAndDelete({_id:id})
  if(!club){
      return res.status(400).json({error: 'No such club'})
  }
  res.status(200).json(club)
}
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');  // Set your upload directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()} + '-' + ${file.originalname}`);
//   }
// });

// const upload = multer({storage});

module.exports = {
    getClubs,
    createClub,
    deleteClub
  }
  