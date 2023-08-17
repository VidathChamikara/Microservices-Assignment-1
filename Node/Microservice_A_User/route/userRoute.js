const express = require('express');
const UserController = require('../controller/UserController');

const router = express.Router();

router.post('/save', UserController.saveUser)
router.put('/update', UserController.updateUser)
router.get('/get', UserController.getUser)
router.delete('/delete', UserController.deleteUser)
router.get('/getAll', UserController.getAllUser)
router.get('/search', UserController.searchUser)

module.exports = router;