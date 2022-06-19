// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//hash the passwords
userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      return next();
    })
  });

export default mongoose.model('Users', userSchema);