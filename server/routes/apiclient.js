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

  router.get('/filtercompany/:companyId', (req, res) => {
    console.log(req.params.companyId)
    Client.getFilter(req.params.companyId).then((data)=>{
      
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
    //res.send(JSON.stringify(data))
  })

  router.post('/addclient', (req, res) => {
      
      Client.addClient(req.body).then((data)=>{
        
        data.reload( 
          {include: [{ model: Company.model, attributes: ['name']}]
        }).then(data=>{
        
        res.send(data)
        })} , (err)=>{
        console.error(err)
        })
  }) 

  router.put('/updateclient', (req, res) => {
      
    Client.updateClient(req.body).then((data)=>{
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
}) 

  router.delete('/deleteclient/:clientId', (req, res) => {
    
    Client.deleteClient(req.params.clientId).then((data)=>{
      res.send();
  }).catch((err)=>{console.error(err);
    throw error;
  });
}) 

  router.get('/comment/:client', (req, res) => {
    let client = req.params.client;
    Comments.getComment(client).then((data)=>{
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
  })

  router.post('/addcomment', (req, res) => {
    Comments.addComment(req.body).then((data)=>{
      data.reload()
      .then(data=>{
        res.send(data)
      })} , (err)=>{
        console.error(err)
      })
}) 

module.exports = router