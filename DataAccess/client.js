var Sequelize=require('sequelize');
var Company = require('./company')
var dataAccess = require('./DataAccess');

class CustomersModel{
constructor(){
  this.model = dataAccess.connection.define('customer', {
    customer_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING
      
    },
    lastname: {
      type: Sequelize.STRING
      
    },

    company_id: {
        type: Sequelize.INTEGER,
        references: 'company_table', 
        referencesKey: 'company_id' 
        
    },

    email: {
        type: Sequelize.STRING
        
      },
    
    phone: {
        type: Sequelize.STRING
        
      }


    },
    {
    freezeTableName: true,    
    tableName: 'customer_table'
    });
this.model.belongsTo(Company.model, {foreignKey: 'company_id'})
Company.model.hasMany(this.model, {foreignKey: 'company_id'})
  
}

  getAll(){
     return this.model.findAll( {include:
       [{ model: Company.model, attributes: ['name']}]});
  }

  addClient(newClient) {

    const client = this.model.build({ firstname: newClient.firstname,
      lastname: newClient.lastname,
      company_id : newClient.company.company_id,
      phone: newClient.phone,
      email : newClient.email               
    });

    return client.save();

  }
  
}
const customer = new CustomersModel()
  module.exports = customer;