const {Schema, model, mongoose} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

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
        type:mongoose.SchemaTypes.Email,
        unique:true, 
        required:true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    // friends:[
    //         {type: Schema.Types.ObjectId,
    //         ref: 'Users' }
    //     ]
    friends:[this]
    },
    {
        toJSON: {
            virtuals:true,
        },
        id:false,
    }
    
)

usersSchema.plugin(uniqueValidator);
usersSchema
    .virtual('friendsCount')
    .get(function() {
        return this.friends.length
    });
    
const Users = model('Users', usersSchema);

module.exports = Users