import express from 'express'
import { registerUser } from '../controllers/usercontroller.js';

const router = express.Router();


router.post('/user/register',(req,res)=> registerUser(req,res));

export default router