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

  static async rename(request, response) {
    try{
      let errors = Group.validate(request.body);
      if (errors.length > 0) {
        return response.send({
          status: 406,
          errors,
        });
      }
      const { rows } = await connection.query('UPDATE groups SET name = $1 WHERE id=$2 RETURNING *', [request.body.groupName, request.params.group_id]);
      if (rows.length > 0) {
        response.send({
          status: 200,
          data: rows,
        });
      } else {
        response.send({
            status: 406,
            error: ['Id not found'],
          });
      }
    } catch(err) {
      console.log(err);
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }
}
export default GroupController;
