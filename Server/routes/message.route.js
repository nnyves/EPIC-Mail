import express from 'express';
import MessageController from '../controllers/message.controller';

// Route for the prefix messages which will control whole message features
const route = express.Router();
route.post('/', MessageController.create);
route.get('/', MessageController.inbox);
route.get('/unread', MessageController.unread);
route.get('/draft', MessageController.draft);
route.get('/sent', MessageController.sent);
route.get('/:messageId', MessageController.get);
route.delete('/:messageId', MessageController.delete);
export default route;
