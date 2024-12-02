import Router from 'express'
const router = Router();

import {register} from '../controllers/userController.js'

router.post('/register',register);

export default router