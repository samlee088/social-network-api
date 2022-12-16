const {Schema, model} = require('mongoose');
const reactions = require('./Reaction')

/* need to adjust date time 'Use a getter method to format the timestamp on query'  */
const thoughtsSchema = new Schema(
    {
    thoughtText: {
        type:String,
        required:true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    userName:{
        type: String,
        required: true
    },
    reactions: [reactions]
    },
    {
        toJson:{
            virtuals:true
        },
        id:true
    }
)


thoughtsSchema
    .virtual('getReactions')
    .get(function() {
        return this.reactions.length
    });



const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts

