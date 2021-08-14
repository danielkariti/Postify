const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const User = require ("../models/user");

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


module.exports = router;
