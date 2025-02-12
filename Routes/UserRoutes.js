import express from 'express';
import UserController from '../Controller/UserController.js';
const router = express.Router();

router.post('/Register', UserController.Add)
router.post('/Login', UserController.Login)

router.route('/:id')
    .get(UserController.FindById)

export default router;