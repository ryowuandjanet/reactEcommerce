import express from 'express';
import {
  loginUser,
  registerUser,
  adminLogin,
} from '../controllers/userController.js';

// 创建用户路由
const userRouter = express.Router();

// 定义路由
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// 导出路由
export default userRouter;
