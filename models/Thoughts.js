const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction')

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
    reactions: [Reaction]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)


thoughtsSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })



const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts

