const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const thoughtsSchema = require('./Thoughts')

/* still needing email validation */
const usersSchema = new Schema(
    {
    userName: {
        type: String, 
        unique:true, 
        required:true, 
        trim:true
    },
    email: {
        type:String,
        unique:true, 
        required:true 
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends:{
        type: Number
    }
    },
    {
        toJson: {
            virtuals:true,
        },
        id:false,
    }
    
)


usersSchema
    .virtual('getFriends')
    .get(function() {
        return this.friends.length
    })
    
const Users = model('Users', usersSchema);

module.exports = Users