const router = require('express').Router();

/* all of the thought promises used for api calls */
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction
} = require('../../Controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(addThoughtReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router