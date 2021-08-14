const path = require('path');
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose= require ('mongoose');
const postsRoutes = require ('./routes/posts');
const userRoutes = require ('./routes/user');


const app = express();

// Connection to MongoDB
mongoose
.connect('mongodb+srv://admin:tpLLd4zzSqIhN6eX@cluster0.3okcl.mongodb.net/node-angular?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

// Set headers to deal with CORS
app.use((req,res,next)=> {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});

// Bodyparser for json objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images", express.static(path.join("backend/images")));


app.use("/posts",postsRoutes);
app.use("/user",userRoutes);

module.exports =  app;
