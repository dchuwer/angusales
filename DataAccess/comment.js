var Sequelize=require('sequelize');
var Client = require('./client')
var dataAccess = require('./DataAccess');

class CommentsModel{
constructor(){
  this.model = dataAccess.connection.define('comment', {
    comment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING
      
    },
    date: {
      type: Sequelize.DATE
      
    },

    customer_id: {
        type: Sequelize.INTEGER,
        references: 'customer_table', 
        referencesKey: 'customer_id' 
        
      }
    },
    {
    freezeTableName: true,    
    tableName: 'comment_table'
    });

//this.model.hasMany(Client.model, {foreignKey: 'customer_id'})
//Client.model.hasMany(this.model, {foreignKey: 'customer_id'})

}

  getComment(client){
     return this.model.findAll({where: { customer_id: client}}
      
    );
  }

  addComment(newComment) {
    
    return this.model.create({   
                                 text: newComment.text,
                                 customer_id : newComment.customer_id,
                                 date: new Date()          
                            });

    

  }
  
}
const comments = new CommentsModel();

module.exports = comments;