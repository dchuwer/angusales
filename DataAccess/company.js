var Sequelize=require('sequelize');
var dataAccess = require('./DataAccess');
var Customer = require('./client')


class CompanyModel {
  constructor () {
    this.model = dataAccess.connection.define('company', {
    company_id: {    
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
      
    },
    country: {
      type: Sequelize.STRING
      
    }

    

  },
    {
    freezeTableName: true,
    tableName: 'company_table'
  });
  }

  getAll(){
    return this.model.findAll();
  }

  addCompany(newCompany) {
    return this.model.create({ name: newCompany.name,
      country: newCompany.country
              
    });
  }

  deleteCompany(companyId) {
    console.log("entrei no deletecompany")
    //this.model.hasMany(Customer.model, {foreignKey: 'company_id', onDelete: 'CASCADE', hooks: true})
    //Customer.model.belongsTo(this.model, {foreignKey: 'company_id', onDelete: 'CASCADE',hooks: true})
    return this.model.destroy( {where : {company_id : companyId} });
  }

  updateCompany(company) {
    
    return this.model.update({ name: company.name,
      country: company.country
                    
    }, {where : {company_id : company.company_id} });
  }
 
}
const company = new CompanyModel()
 module.exports = company; 
  

 