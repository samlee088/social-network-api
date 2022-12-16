const {Users, Thoughts} = require('../models');




module.exports = {

    getThoughts(req,res) {
        Thoughts.find()
        .then ((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res) {
        Thoughts.findOne({_id: req.params.userName})
        .select()
        .lean()
        .then ( async (thought) => {
            !thought ? res.status(404).json({message:'No thoughts found'}) : res.json( {
                thoughtText,
                totalFriends: await friendsCount()
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        })
    },

    createThought(req,res) {
        Thoughts.create(req.body) 
        .then((thought) => {
            return Users.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {thoughts: thought._id}},
                {new:true}
            )
        })
        .then((user) => 
            !user
            ? res.status(404).json({message:"Unable to locate user"})
            : res.status(200).json({message:"Thought added to user"}))
        .catch((err) => {console.error(err), res.status(500).json(err)});
    },

    updateThought(req,res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thought._id},
            {$set: req.body},
            {runValidators:true, new:true}
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message:"No thought with id"})
            : res.status(200).json(thought)
        )
        .catch((err) => {console.log(err),res.status(500).json(err)})
    },

    deleteThought(req,res) {
        Thoughts.findOneAndDelete(
            {_id: req.params.thought._id}
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message:"Unable to locate thought"})
            :   Users.findOneAndUpdate(
                    {thoughts:req.params.thought._id},
                    {$pull:{thoughts:req.params.thought._id}},
                    {new:true}
            ))
            .then((user) => 
                !user
                ? req.status(404).json({message:"Unable to locate user"})
                : res.status(200).json({message:"Thought deleted from thought and user collections"})
            )
        .catch((err) => res.status(500).json(err))    
    },

    addThoughtReaction (req,res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thought._id },
            { $addToSet: {reactions: req.body} },
            { runValidators:true, new:true }
        )
        .then((thought) => {
            !thought
            ? res.status(404).json({message:"Unable to locate thought with that ID"})
            : res.status(200).json({message:"Success with adding in reaction"})
        })
        .catch((err) => res.status(500).json(err))
    },

    removeThoughtReaction(req,res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thought_id },
            { $pull: {reactions: {reactionId: req.params.reactionId } } },
            { runValidators:true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({message:"Unable to location thought with that ID"})
            : res.status(200).json(thought))
        .catch((err) => res.status(500).json(err))
    }



}