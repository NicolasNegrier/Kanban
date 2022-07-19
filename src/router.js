const express = require('express');
const userController = require('./controllers/userController');
const departmentController = require('./controllers/departmentController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

// routes USERS
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getOneUser);
router.put('/users', userController.addUser);
router.patch('/users/:id', userController.modifyUser);
router.delete('/users/:id', userController.deleteUser);

// routes DEPARTMENT
router.get('/departments', departmentController.getAlldepartments);
router.get('/departments/:id', departmentController.getOneDepartment);
router.put('/departments', departmentController.addDepartment);
router.patch('/departments/:id', departmentController.modifyDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

module.exports = router;
