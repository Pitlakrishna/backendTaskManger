import express from "express"
import { addtaskController, deleteTaskController, getAllTaskController, getSingleTaskController, updateTaskController } from "../controller/taskController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/addtask', addtaskController)
router.put('/updatetask/:id',  updateTaskController)
router.delete('/deletetask/:id',  deleteTaskController)
router.get('/getsingletask/:id', getSingleTaskController)
router.get('/getalltasks/:email', getAllTaskController)

export default router
