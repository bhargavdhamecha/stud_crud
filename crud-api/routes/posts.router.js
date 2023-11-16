const express = require('express');
const router = express.Router();

const postController = require('../controller/post.controller');

router.get('/getAllStudents', postController.getAllStudents);
router.post('/addStudent', postController.addStudent);
router.delete('/deleteStudent', postController.deleteStudent);
router.put('/updateStudent', postController.updateStudent);

module.exports = router;