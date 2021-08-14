const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  email:      {type: String, required: true, unique: true},
  password:   {type: String, required: true},
  fullName:   {type: String, required: true},
  birthDate:  {type: Date, required: true},
  address:    {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
