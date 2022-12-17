const {Users, Thoughts} = require('../models');




module.exports = {

    getThoughts(req,res) {
        Thoughts.find()
            .select('-__v')
            .populate('reactions')
        .then ((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res) {
        Thoughts.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .populate('reactions')
        .then ((thought) => {
            !thought ? res.status(404).json({message:'No thoughts found'}) : res.json({thought})
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
                { userName: req.body.userName },
                { $addToSet: {thoughts: thought._id}} ,
                { runValidators: true, new: true }
            )
        })
        .then((thought) => 
            !thought
            ? res.status(200).json(thought)
            : res.status(200).json({message:"Thought added to user"}))
        .catch((err) => {console.error(err), res.status(500).json(err)});
    },

    updateThought(req,res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { runValidators:true, new:true}
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
            {_id: req.params.thoughtId}
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message:"Unable to locate thought"})
            :   Users.findOneAndUpdate(
                    {thoughts:req.params.thoughtId},
                    {$pull:{thoughts:req.params.thoughtId}},
                    {new:true}
            ))
            .then((user) => 
                !user
                ? req.status(404).json({message:"Unable to locate user"})
                : res.status(200).json(user)
            )
        .catch((err) => res.status(500).json(err))    
    },

    addThoughtReaction (req,res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
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
            { _id: req.params.thoughtId },
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