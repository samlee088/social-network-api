const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction')
const moment = require('moment');

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
        default: Date.now,
        get: (date) => {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a')
        }
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
          getters: true
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

