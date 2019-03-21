import express from 'express';
import GroupController from '../controllers/group.controller';

// Route with prefix group
const route = express.Router();
route.post('/', GroupController.create);
route.get('/', GroupController.all);
route.patch('/:group_id/name', GroupController.rename);
route.delete('/:group_id', GroupController.delete);
route.post('/:group_id/users', GroupController.addMember);
route.delete('/:group_id/users/:user_id',GroupController.removeMember);
export default route;
