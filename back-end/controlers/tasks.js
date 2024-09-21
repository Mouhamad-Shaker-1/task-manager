const { StatusCodes } = require("http-status-codes")
const Task = require("../models/Task")
const { NotFoundError, BadRequestError } = require("../errors")

const getAllTasks = async (req, res) => {
    const querys = req.query;

    // Initialize the query object
    const queryObject = { createdBy: req.user.userID };

    // If a date is provided in the query, filter tasks by that date
    if (querys.date) {
        // Assuming querys.date is in the format 'YYYY-MM-DD'
        const startDate = new Date(querys.date);
        const endDate = new Date(querys.date);
        endDate.setDate(endDate.getDate() + 1); // End date is the next day

        queryObject.createdAt = {
            $gte: startDate,
            $lt: endDate,
        };
    }

    // Find tasks based on the query object and sort by createdAt
    const tasks = await Task.find(queryObject).sort('createdAt');
    res.status(StatusCodes.OK).json(tasks)
}

const getSingleTask = async (req, res) => {
    const taskID = req.params.id
    const userID = req.user.userID
    const task = await Task.findOne({createdBy: userID, _id: taskID})
    if (!task) {
        throw new NotFoundError(`there are no task with ${taskID} id.`)
    }
    res.status(StatusCodes.OK).json({task})
}

const createTask = async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    req.body.createdBy = req.user.userID
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}

const updateTask = async (req, res) => {
    const taskID = req.params.id
    const userID = req.user.userID
    const {name, description, completed} = req.body 
    console.log(req.body, userID)
    if(!name && completed=== undefined){
        throw new BadRequestError('name or description fields cannot be empty')
    }
    const task = await Task.findOneAndUpdate({createdBy: userID, _id: taskID}, req.body, {new:true, runValidators: true})
    if (!task) {
        throw new NotFoundError(`there are no task with ${taskID} id.`)
    }
    res.json(task)
}

const deleteTask = async (req, res) => {
    const taskID = req.params.id
    const userID = req.user.userID
    const task = await Task.findOneAndDelete({createdBy: userID, _id: taskID})
    if (!task) {
        throw new NotFoundError(`there are no task with ${taskID} id.`)
    }
    res.status(StatusCodes.OK).json({task})
}

const performance = async (req, res) => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  
    const completedTasks = await Task.countDocuments({ createdBy: req.user.userID, completed: true, updatedAt: { $gte: startOfMonth } });
    const totalTasks = await Task.countDocuments({ createdBy: req.user.userID, createdAt: { $gte: startOfMonth } });
    const pendingTasks = await Task.countDocuments({ createdBy: req.user.userID, completed: false, createdAt: { $gte: startOfMonth } });
  
    res.json({ completedTasks, totalTasks, pendingTasks });

}

module.exports = {getAllTasks, getSingleTask, createTask, updateTask, deleteTask, performance}