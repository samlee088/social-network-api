const router = require('express').Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../Controllers/usersController')


router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router