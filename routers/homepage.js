// const express = require('express');
import express, { response } from 'express';
const router = express.Router();

import fetch from 'node-fetch';


router.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dummy.html'), (err) => {
      if (err) next(err);
      else{
        console.log('dummy html sent')
        return res.status(200)
      }
    })
  })
  

//reminder: change q to become value of user input (zip code)
router.get('/weather', (req, res) => {
    return fetch(`http://api.weatherapi.com/v1/current.json?` + new URLSearchParams({
        key: 'f4ed72e1a7d44a03aaf35628221606',
        q: '10001'
    }))
    .then(data =>  data.json())
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        const errorCatcher = {
          log: 'weather broke',
          message: err
        };
        throw(errorCatcher);
      });
    })


//response returns an object. need to access the url property and concact it with https://cataas.com to be the actual image link.
 router.get('/catmemes', (req, res) => {
    return fetch(`https://cataas.com/cat?json=true`)
    .then(data => data.json())
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        const errorCatcher = {
            log: 'catmemes failed',
            message: err
        };
        throw(errorCatcher);
        });
    })
    




export default router;