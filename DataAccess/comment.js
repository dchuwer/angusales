var Sequelize=require('sequelize');
var Client = require('./client')
var dataAccess = require('./DataAccess');

class CommentsModel{
constructor(){
  this.model = dataAccess.connection.define('comment', {
    comment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
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
        referencesKey: '    ' 
        
      }
    },
    {
    freezeTableName: true,    
    tableName: 'comment_table'
    });

this.model.belongsTo(Client.model, {foreignKey: 'customer_id'})
Client.model.hasMany(this.model, {foreignKey: 'customer_id'})

}

  getComment(client){
     return this.model.findAll({where: { customer_id: client},
      include:
        [ Client.model]}
    );
  }

  addComment(newComment) {

    const comment = this.model.build({ text: newClient.text,
      lastname: newClient.lastname,
      client_id : newClient.client_id,
      date: new Date()          
    });

    return comment.save();

  }
  
}
const comment = new CommentsModel()
  module.exports = comment;