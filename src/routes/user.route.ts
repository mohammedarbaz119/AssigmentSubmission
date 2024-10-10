// User Routes
import {Router} from 'express';
import {
  registerUser,
  loginUser,
  uploadAssignment,
  fetchAdmins,
  logout,
} from '../controller/user.controller.js';
import validateUsernameOrEmail from '../utils/isEmail.js';
import { UserAuth } from '../utils/ValidateToken.js';

const UserRouter = Router();


UserRouter.post('/register', registerUser);

UserRouter.post('/login',validateUsernameOrEmail, loginUser);

// Below 3 routes needs Auth
UserRouter.post("/logout",UserAuth,logout) 
UserRouter.post('/upload',UserAuth,uploadAssignment);
UserRouter.get('/admins', UserAuth,fetchAdmins);

export default UserRouter;
