const express = require('express')
var Sequelize=require('sequelize');

const router = express.Router()

var Client = require('../../DataAccess/client')
var Comments = require('../../DataAccess/comment')
var Company = require('../../DataAccess/company')

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
        console.log("inside post api " + data)
        data.reload( 
          {include: [{ model: Company.model, attributes: ['name']}]
        }).then(data=>{
        console.log("resultado da volta do API "+ data);
        res.send(data)
        })} , (err)=>{
        console.error(err)
        })
  }) 

  router.get('/comment/:client', (req, res) => {
    let client = req.params.client;
    
    Comments.getComment(client).then((data)=>{
      console.log(data)
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
    //res.send(JSON.stringify(data))
  })

module.exports = router