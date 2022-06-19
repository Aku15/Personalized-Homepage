import express from 'express';
import mongoose from 'mongoose';
const app = express();
import path from 'path';
const __dirname = path.resolve();
import userController from './controllers/userControllers.js';
import homepage from './routers/homepage.js';
import cookieController from './controllers/cookieController.js';

//mongo server connection.
const serverConnection = 'mongodb+srv://aku15atlas:NfFF5H6J7m9C71kj@soloprojectcluster.pnvqxti.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(serverConnection);

app.use(express.json());


//show default page and assign cookie.
app.get('/', cookieController.createCookie, (req, res) => {
  res.sendFile(path.join(__dirname, './html/dummy.html'))
})

//show signup when redirected to /signup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './html/signup.html'))})

app.post('/signup', userController.createUser, (req, res) => {
  // const {username, password} = req.body;
  // console.log(req.body.username, req.body.password)
  return res.redirect('/secret');
})


app.post('/login', userController.login, (req, res) => {
  res.redirect('/secret')
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, './html/userlist.html'))})


  app.get('/secret/users', userController.getAllUsers, (req, res) => {
    res.send( { users: res.locals.users });
  })
  
//routes
app.get('/home', homepage);
app.get('/weather', homepage);
app.get('/catmemes', homepage);
app.get('/bored', homepage);



//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    console.log(err)
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  });

app.listen(3000, () => console.log(`listening on port 3000`));

export default app;