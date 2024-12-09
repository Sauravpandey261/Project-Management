import express from 'express';
import { DeleteTask, getUserCompletedTask, getUserImportantTask, getUserInCompletedTask, getUserTask, PostTask, updateTaskCompleted, updateTaskImportant } from '../controller/task.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, PostTask)
router.route('/get').get(isAuthenticated, getUserTask)
router.route('/getimportant').get(isAuthenticated, getUserImportantTask)
router.route('/getcomplete').get(isAuthenticated, getUserCompletedTask)
router.route('/getincomplete').get(isAuthenticated, getUserInCompletedTask)
router.route('/:id/updatecomplete').post(isAuthenticated, updateTaskCompleted)
router.route('/:id/updateimportant').post(isAuthenticated, updateTaskImportant)
router.route('/:id/delete').get(isAuthenticated, DeleteTask)

export default router;