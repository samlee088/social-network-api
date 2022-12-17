const {Users, Thoughts} = require('../models')

/* list of all of the users promises that gets added to users routes */
module.exports = {

    getUsers(req,res) {
        Users.find()
            .select('-__v')
            .populate('thoughts')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
        .then((user) => {
            !user 
            ? res.status(404).json({message: 'Unable to locate user with that user name'}) 
            : res.json(user)
        })
        .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
        })
    },
    createUser(req,res) {
        Users.create(req.body)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err))
    },
    updateUser(req,res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => {
            !user 
            ? res.status(404).json({message:"No user Found"})
            : res.status(200).json({message:"Success with user update"})
        })
        .catch((err) => {console.error(err), res.status(500).json(err)})
    },
    deleteUser(req,res) {
        Users.findOneAndDelete({
            _id: req.params.userId
        })
        .then((user) => {
            if(!user) {
              return ;
            } else {
            return Thoughts.deleteMany(
                { userName: user.userName },
                { new: true }
                )
            }
        })
        .then((thoughts) => 
            !thoughts
            ? res.status(404).json({message:"User deleted, but no thoughts found"})
            : res.status(200).json({message:"User and thought deleted"})
        )
        .catch((err) => {console.error(err), res.status(500).json(err)})
    },
    addFriend(req,res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((friend) => 
            !friend
            ? res.status(404).json({message:'Unable to locate user'})
            : res.status(200).json(friend))
        .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req,res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
            ? res.status(404).json({message:"Unable to locate user"})
            : res.status(200).json(user)
        )
        .catch((err) => {
            res.status(500).json(err)
        })
    }

}