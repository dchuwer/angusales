var Sequelize=require('sequelize');
var Company = require('./company')
var Comments = require('./comment')
var dataAccess = require('./DataAccess');

class CustomersModel{
constructor(){
  this.model = dataAccess.connection.define('customer', {
    customer_id: {
      
      autoIncrement: true,
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
    console.log("entrei no addclient do client API ")
    console.log(newClient)
    return this.model.create({ firstname: newClient.firstname,
      lastname: newClient.lastname,
      company_id : newClient.company.company_id,
      phone: newClient.phone,
      email : newClient.email               
    });
  }

  updateClient(client) {
    console.log(client.company.company_id)
    return this.model.update({ firstname: client.firstname,
      lastname: client.lastname,
      company_id : client.company.company_id,
      phone: client.phone,
      email : client.email               
    }, {where : {customer_id : client.customer_id} });
  }

  deleteClient(clientId) {
    console.log("entrei no deleteclient")
    this.model.hasMany(Comments.model, {foreignKey: 'customer_id', onDelete: 'CASCADE'})
    Comments.model.belongsTo(this.model, {foreignKey: 'customer_id'})
    return this.model.destroy( {where : {customer_id : clientId} });
  }
  
}
const customer = new CustomersModel()
  module.exports = customer;