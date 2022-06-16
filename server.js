
import express from 'express';
const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
import path from 'path';

// const homepage = require('./routers/homepage.js');
import homepage from './routers/homepage.js';

// app.use(express.json());


app.get('/', (req, res) => {
    return res.json({home: 1})
  })




app.get('/home', homepage);
app.get('/weather', homepage);
app.get('/catmemes', homepage);

// app.call((req, res, next) => {
//     res.status(404);
//     return next();
// })

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