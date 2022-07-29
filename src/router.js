const express = require('express');
const userController = require('./controllers/userController');
const departmentController = require('./controllers/departmentController');
const projectController = require('./controllers/projectController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const labelController = require('./controllers/labelController');

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
router.get('/departments', departmentController.getAllDepartments);
router.get('/departments/:id', departmentController.getOneDepartment);
router.put('/departments', departmentController.addDepartment);
router.patch('/departments/:id', departmentController.modifyDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

// routes PROJECT
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getOneProject),
router.put('/projects', projectController.addProject),
router.patch('/projects/:id', projectController.modifyProject),
router.delete('/projects/:id', projectController.deleteProject),

// routes LIST
router.get('/lists', listController.getAllLists),
router.get('/lists/:id', listController.getOneList),
router.put('/lists', listController.addList),
router.patch('/lists/:id', listController.modifyList),
router.delete('/lists/:id', listController.deleteList),

// routes CARD
router.get('/cards', cardController.getAllCards),
router.get('/cards/:id', cardController.getOneCard),
router.put('/cards', cardController.addCard),
router.patch('/cards/:id', cardController.modifyCard),
router.delete('/cards/:id', cardController.deleteCard),

// routes LABEL
router.get('/labels', labelController.getAllLabels),
router.get('/labels/:id', labelController.getOneLabel),
router.put('/labels', labelController.addLabel),
router.patch('/labels/:id', labelController.modifyLabel),
router.delete('/labels/:id', labelController.deleteLabel),

module.exports = router;
