import Group from '../models/group.model';
import connection from '../database/connection';

class GroupController {
  static async create(request, response) {
    try {
      const errors = Group.validate(request.body);
      if (errors.length > 0) {
        return response.json({
          status: 401,
          errors,
        });
      }
      const data = await Group.save(request.body);
      response.send({
        status: 200,
        data,
      });
    } catch (err) {
      if (err.routine && err.routine === '_bt_check_unique') {
        response.send({
          status: 401,
          error: ['Group name already exists'],
        });
      } else {
        response.send({
          status: 500,
          error: ['Internal Error'],
        });
      }
    }
  }

  static async all(request, response) {
    try{
      const data = await Group.getAll();
      response.send(
        {
          status: 200,
          data
        }
      ); } catch(err) {
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }
}
export default GroupController;
