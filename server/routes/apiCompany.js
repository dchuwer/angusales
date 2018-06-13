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


module.exports = router