const express = require('express')
const router = express.Router()

const {getAllTasks, getSingleTask, createTask, updateTask, deleteTask, performance} = require('../controlers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/performance').get(performance)
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask)

module.exports = router