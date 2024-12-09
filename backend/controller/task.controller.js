import { Task } from "../model/Task.model.js";

// Post Job
export const PostTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.id;
        if (!title || !description) {
            return res.status(400).json({
                message: "Someting is missing",
                success: false,
            })
        }
        const task = await Task.create({
            title,
            description,
            user: userId
        });
        return res.status(201).json({
            message: "New task created",
            task,
            success: true
        })
    } catch (error) {
        console.log('Error in PostTask Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Get User Task
export const getUserTask = async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ user: userId }).populate({
            path: 'user'
        }).sort({ createdAt: -1 })
        if (!tasks) {
            return res.status(404).json({
                message: "No task found",
                success: false
            })
        }
        return res.status(200).json({
            tasks,
            success: true
        })

    } catch (error) {
        console.log('Error in getUserTasks Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}
// get all incompleted Task
export const getUserInCompletedTask = async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ user: userId, complete: false }).populate({
            path: 'user'
        }).sort({ createdAt: -1 })
        if (!tasks) {
            return res.status(404).json({
                message: "No task found",
                success: false
            })
        }
        return res.status(200).json({
            tasks,
            success: true
        })

    } catch (error) {
        console.log('Error in getUserInCompletedTask Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}
// get all completed Task
export const getUserCompletedTask = async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ user: userId, complete: true }).populate({
            path: 'user'
        }).sort({ createdAt: -1 })
        if (!tasks) {
            return res.status(404).json({
                message: "No task found",
                success: false
            })
        }
        return res.status(200).json({
            tasks,
            success: true
        })

    } catch (error) {
        console.log('Error in getUserCompletedTask Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}

// get all important task
export const getUserImportantTask = async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ user: userId, important: true }).populate({
            path: 'user'
        }).sort({ createdAt: -1 })
        if (!tasks) {
            return res.status(404).json({
                message: "No task found",
                success: false
            })
        }
        return res.status(200).json({
            tasks,
            success: true
        })

    } catch (error) {
        console.log('Error in getUserImportantTask Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })

    }
}

// update task by id as Complete/incomplete
export const updateTaskCompleted = async (req, res) => {
    try {
        const { status } = req.body;
        const taskId = req.params.id;

        // find task by taskId
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json({
                message: "No Task found",
                success: false
            })
        }
        // update as complete
        task.complete = status;
        await task.save();

        return res.status(200).json({
            message: "Complete Status updated Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in updateTaskCompleted Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// update task by id as Important
export const updateTaskImportant = async (req, res) => {
    try {
        const { status } = req.body;
        const taskId = req.params.id;

        // find task by taskId
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json({
                message: "No Task found",
                success: false
            })
        }
        // update as Important
        task.important = status;
        await task.save();

        return res.status(200).json({
            message: "Important status updated Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in updateTaskImportant Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// delete a task
export const DeleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // find task to delete
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json({
                message: "No Task found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Task deleted Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in DeleteTask Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}