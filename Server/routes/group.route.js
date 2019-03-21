import express from 'express';
import GroupController from '../controllers/group.controller';

// Route with prefix group
const route = express.Router();
route.post('/',GroupController.create)
route.get('/',GroupController.all);
route.patch('/:group_id/name',GroupController.rename);
export default route;