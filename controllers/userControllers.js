// const bcrypt = require('bcryptjs/dist/bcrypt');
// const {pass} = require('sinon/lib/sinon/assert');
// const User = require('./mongoserver.js');
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

userController.createUser = (req, res) => {
    // write code here
    console.log(req.body)
    // const { username, password } = req.body;
    // console.log('Username --> ', username);
    // console.log('Password --> ', password);
    if (username && password) {
      User.create({ username: username, password: password })
        .then(data => {
          console.log('New user created!');
          res.locals.id = data.id;
          return res.status(200);
        })
        .catch(err => {
          next('Error in userController.createUser: ' + JSON.stringify(err))
        })
    } else {
      return next('Please enter a username and password'); // how does this get routed to the global error handler? server.js?
    }
  };

  export default userController;