const express = require('express')
var Sequelize=require('sequelize');

const router = express.Router()

var Company = require('../../DataAccess/company')


router.get('/company', (req, res) => {
    
    Company.getAll().then((data)=>{
      res.send(data);
    }).catch((err)=>{console.error(err);
      throw error;
    });
    //res.send(JSON.stringify(data))
  })

  router.post('/addcompany', (req, res) => {
      
    Company.addCompany(req.body).then((data)=>{
      
      data.reload()
      .then(data=>{
        res.send(data)
      })} , (err)=>{
      console.error(err)
      })
}) 

  router.delete('/deletecompany/:companyId', (req, res) => {
      
    Company.deleteCompany(req.params.companyId).then((data)=>{
      res.send();
  }).catch((err)=>{console.error(err);
    throw error;
  });

}) 

router.put('/updatecompany', (req, res) => {
      
  Company.updateCompany(req.body).then((data)=>{
    res.send(data);
  }).catch((err)=>{console.error(err);
    throw error;
  });
}) 


module.exports = router