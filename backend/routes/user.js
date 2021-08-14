const express = require ("express");
const router = express.Router();
const bcrypt = require ("bcrypt");
const User = require ("../models/user");
const jwt = require ("jsonwebtoken");
const user = require("../models/user");


const salt="{riUV(a<cl8aa0qP!@D+";

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user= new User({
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName,
      birthDate: req.body.birthDate,
      address: req.body.address
    });
    user.save()
    .then(result => {
      res.status(201).json({message:'User created' , result: result});
    });
  }).catch(err =>{
    res.status(500).json({
      error: err
    })
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then( user => {
    if (!user){
      return res.status(401).json({
        message: 'Login failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Login failed'
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      salt,
      { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
  }).catch(err => {
    return res.status(401).json({
      message: 'Login failed'
    });
  });
});

module.exports = router;



