//Admin Routes 
import {Router} from 'express';
import {
  registerAdmin,
  loginAdmin,
  viewAssignments,
  acceptAssignment,
  rejectAssignment,
  Adminlogout,
} from '../controller/admin.controller.js';
import validateUsernameOrEmail from '../utils/isEmail.js';
import { AdminAuth } from '../utils/ValidateToken.js';


const AdminRouter = Router();



AdminRouter.post('/register',registerAdmin);

AdminRouter.post('/login',validateUsernameOrEmail, loginAdmin);


//All the Below routes need Auth
AdminRouter.post("/logout",AdminAuth,Adminlogout)

AdminRouter.get('/assignments', AdminAuth,viewAssignments);

AdminRouter.post('/assignments/:id/accept',AdminAuth, acceptAssignment);

AdminRouter.post('/assignments/:id/reject',AdminAuth, rejectAssignment);

export default AdminRouter;
