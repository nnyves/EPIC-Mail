import express from 'express';
import GroupController from '../controllers/group.controller';
import groupAuth from '../middlewares/group.middleware';

// Route with prefix group
const route = express.Router();
route.post('/', GroupController.create);
route.get('/', GroupController.all);
route.patch('/:group_id/name', groupAuth, GroupController.rename);
route.delete('/:group_id', groupAuth, GroupController.delete);
route.post('/:group_id/users', groupAuth, GroupController.addMember);
route.delete('/:group_id/users/:user_id', groupAuth, GroupController.removeMember);
export default route;
