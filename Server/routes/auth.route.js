import express from 'express';
import UserController from '../controllers/user.controller';

// Route with prefix auth
const route = express.Router();
route.post('/login', UserController.login);
route.post('/register', UserController.register);
export default route;
