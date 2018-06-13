var Sequelize=require('sequelize');
var dataAccess = require('./DataAccess');



class CompanyModel {
  constructor () {
    this.model = dataAccess.connection.define('company', {
    company_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
      
    },
    country: {
      type: Sequelize.STRING
      
    },

  },
    {
    freezeTableName: true,
    tableName: 'company_table'
  });
  }

  getAll(){
    return this.model.findAll();
  }

 
}
const company = new CompanyModel()
 module.exports = company; 
  

 