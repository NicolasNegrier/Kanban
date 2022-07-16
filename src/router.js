const express = require('express');
const userController = require('./controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});

router.get('/users', userController.getAllUsers);
router.put('/users', userController.addUser);

module.exports = router;