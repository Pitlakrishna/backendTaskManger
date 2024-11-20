import taskModel from "../model/taskModel.js"

// cerate Task
export const addtaskController = async (req, res) => {
    try {
        const { task, message, name, email } = req.body

        if (!task) {
            return res.send({ message: "task is Required" })
        }
        if (!name || !email) {
            return res.send({ message: "nameORemail is Required" })
        }
        if (!message) {
            return res.send({ message: "message is Required" })
        }
        const newTask = await new taskModel({ email, name, message, task }).save()
        res.status(201).send({
            message: 'Task Created Successfully',
            success: true,
            newTask
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error in Creating task ..',
            success: false,
        })
    }
}

//Get Single Task

export const getSingleTaskController = async (req, res) => {
    try {
        const { id } = req.params
        const tasks = await taskModel.findById(id)
        res.status(200).send({
            message: "Getting Single Task",
            success: true,
            tasks
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error in Getting Single task ..',
            success: false,
        })
    }
}

// Get All Tasks
export const getAllTaskController = async (req, res) => {
    const { email } = req.params

    try {
        const task = await taskModel.find({ email })
        res.status(200).send({
            message: "Getting All Tasks",
            success: true,
            task
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error in Getting Single task ..',
        })
    }
}


// update Task

export const updateTaskController = async (req, res) => {
    try {
        const { task, name, message } = req.body
        const { id, email } = req.params
        const tasks = await taskModel.findById(id)

        const updateTask = await taskModel.findByIdAndUpdate(id, {
            task: task || tasks.task,
            name: name || tasks.name,
            message: message || tasks.message,
            email: email || tasks.email
        }, { new: true })

        res.status(200).send({
            message: 'Updated Successfully .... ',
            success: true,
            updateTask
        })


    } catch (error) {
        res.status(500).send({
            message: 'Error in Updating task ..',
        })
    }
}


//Delete Task

export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params
        await taskModel.findByIdAndDelete(id)
        res.status(200).send({
            message: 'Deleted SuccessFully',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error in Tasks Deleting',
            success: false,

        })
    }
}
