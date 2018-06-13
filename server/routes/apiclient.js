const express = require('express')
var Sequelize=require('sequelize');

const router = express.Router()

var Client = require('../../DataAccess/client')

router.get('/client', (req, res) => {
    
    Client.getAll().then((data)=>{
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
    //res.send(JSON.stringify(data))
  })

  router.post('/addclient', (req, res) => {
      
      Client.addClient(req.body).then((data)=>{
        console.log("resultado da volta do API "+ data);
        res.send(data)
        } , (err)=>{
        console.error(err)
        })
   
      
    
  }) 

module.exports = router