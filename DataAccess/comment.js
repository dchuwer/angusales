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
    datw: {
      type: Sequelize.DATE
      
    },

    customer_id: {
        type: Sequelize.INTEGER,
        references: 'customer_table', 
        referencesKey: 'client_id' 
        
      }
    },
    {
    freezeTableName: true,    
    tableName: 'comment_table'
    });
this.model.belongsTo(Client.model, {foreignKey: 'client_id'})
Client.model.hasMany(this.model, {foreignKey: 'client_id'})
  
}

  getAll(){
     return this.model.findAll( {include:
       [{ model: Client.model, attributes: ['name']}]});
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
const comment = new CommentModel()
  module.exports = comment;