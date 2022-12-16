const {Users, Thoughts} = require('../models')


const friendsCount = async () => 
    Users.aggregate()

    .then((numberOfFriends) => numberOfFriends)
    .catch((err) => console.error(err), res.status(500).json({message:"Error with friend count"}));




module.exports = {

  getUsers(req,res) {
    Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req,res) {
    Users.findOne({_id: req.params.userName})
        .select()
        .lean()
        .then(async (user) => {
            !user ? res.status(404).json({message: 'Unable to locate user with that user name'}) : res.json({
                username, 

            })
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
            {_id:req.params.userName},
            {$set:req.body},
            {validator:true, new:true}
        )
        .then((user) => {
            !user 
            ? res.status(500).json({message:"No user Found"})
            : res.status(200).json({message:"Success with user update"})
        })
        .catch((err) => {console.error(err), res.status(500).json(err)})
    },
    
    deleteUser(req,res) {
        Users.findOneAndDelete({
            _id: req.params.userName
        })
        .then((user) => {
            !user 
            ? res.status(500).json({message:'Unable to find user'})
            : Thoughts.deleteMany({_id:req.params.userName})
        })
        .then(() => res.status(200).json({message:"User and thoughts deleted"}))
        .catch((err) => {console.error(err), res.status(500).json(err)})
    }

}