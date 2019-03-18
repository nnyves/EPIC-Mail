import express from 'express';
import MessageController from '../controllers/message.controller';

const route = express.Router();
route.post('/', MessageController.create);
route.get('/', MessageController.inbox);
export default route;