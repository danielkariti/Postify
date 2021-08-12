const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();

app.use((req,res,next)=> {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/posts",(req,res,next)=>{
  const post = req.body;
  console.log(post)
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/posts",(req,res,next)=>{
  const posts = [
    {
      id:"123",
      title:"My first post",
      content:"Hey, its me the 1st post"
    },
    {
      id:"1787",
      title:"My post",
      content:"Hey, nononoononno"
    },
  ];

  res.status(200).json({
    message: 'Post fetched successfully',
    posts: posts
  });
});

module.exports =  app;
