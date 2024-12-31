require('dotenv').config()
const express = require('express')
const cors = require('cors')
const club = require('./routes/clubs')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

//express app
const app=express();
app.use(cors())


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));  

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Set your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} + '-' + ${file.originalname}`);
  }
});

const upload = multer({storage});

app.get("/upload",(req,res)=>{
  res.render("upload");
});

app.post("upload",upload.single("clubImage"),(req,res)=>{
    return res.send("Image uploaded");
  });
//routes
app.use('/api/clubs',club)

//connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    //listen to requests
    app.listen(process.env.PORT,()=>{
    console.log('Connected to DB,listening to port',process.env.PORT)
})
 })

 .catch((error)=>{
    console.log(error)
 })

app.get('/api/clubs', async (req, res) => {
    try {
      const clubs = await clubs.find(); // Fetch all clubs from the database
      res.json(clubs); // Return the clubs as JSON
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});
  

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
  } else {
      res.type('txt').send('404 Not Found')
  }
})



