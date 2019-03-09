import express from 'express';
import UserController from '../controllers/user.controller';

const route = express.Router();
route.post('/login', UserController.login);
export default route;
