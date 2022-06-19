// const bcrypt = require('bcryptjs/dist/bcrypt');
// const {pass} = require('sinon/lib/sinon/assert');
// const User = require('./mongoserver.js');
import bcrypt from 'bcryptjs'
import User from '/home/level2zombie/Personalized-Homepage/mongoserver.js'

const userController = {};


userController.getAllUsers = (req, res, next) => {
    console.log('inside getall')
    User.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err)
        return next(
          'Error in userController.getAllUsers: ' + JSON.stringify(err)
        );
  
      // store retrieved users into res.locals and move on to next middleware
      res.locals.users = users;
      return next();
    });
  };

userController.createUser = (req, res, next) => {
    // write code here
    console.log('inside create user')
    console.log(req.body)
    const { username, password } = req.body;
    if (username && password) {
      console.log('usercreated')
      User.create({ username: username, password: password })
        .then(data => {
          console.log('New user created!');
          res.locals.id = data.id;
          return next();
        })
        .catch(err => {
          next('Error in userController.createUser: ' + JSON.stringify(err))
        })
    } 
  };

//login functionality
  userController.login = (req, res, next) => {
    console.log('inside login middleware')
    const {username, password} = req.body;
    User.findOne({username})
      .then(data => {
        if (!data) res.redirect('/signup');
        else{
          bcrypt.compare(password, data.password)
            .then(match => {
              if (!match) res.redirect('/signup');
              else{
                console.log('login successful')
                res.locals.id = data.id;
                return next();
          }
        })
      }
    })
  }

  // userController.login = (req, res, next) => {
  //   console.log('inside login')
  //   const {username, password} = req.body;
  //   console.log(req.body)
  //     User.findOne({username})
  //     .then((data) =>  bcrypt.compare(password, data.password))
  //     .then((data) => console.log(data))
  // }
  export default userController;