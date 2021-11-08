const express = require('express');
const { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true }); // because merged the URL params

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

router.use(protect);   // anything below this will use protect middleware
router.use(authorize('admin'));          // anything below this have to be under admin

router
    .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;