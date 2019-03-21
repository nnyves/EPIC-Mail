import Group from '../models/group.model';
import connection from '../database/connection';
import GroupMember from '../models/group.member.model';

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
      const admin = {
        memberid: request.user.id,
        groupid: data[0].id,
        role: 'admin',
      }
      await GroupMember.save(admin);
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
        console.log(err);
        response.send({
          status: 500,
          error: ['Internal Error'],
        });
      }
    }
  }

  static async all(request, response) {
    try {
      const data = await Group.getAll();
      response.send(
        {
          status: 200,
          data,
        },
      );
    } catch (err) {
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }

  static async rename(request, response) {
    try {
      const errors = Group.validate(request.body);
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
    } catch (err) {
      console.log(err);
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }

  static async delete(request, response) {
    try {
      const data = await Group.delete(request.params.group_id);
      if (data.length > 0) {
        response.send({
          status: 200,
          data,
        });
      } else {
        response.send({
          status: 406,
          error: ['Id not found'],
        });
      }
    } catch (err) {
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }

  static async addMember(request, response) {   
    try {
      const memberid = request.body.userId;
      const groupid = request.params.group_id;
      console.log({ memberid, groupid });
      const role = 'chat';
      const data = await GroupMember.save({ memberid, groupid, role });
      if (data.length > 0) {
        response.send({
          status: 200,
          data,
        });
      } else {
        response.send({
          status: 406,
          error: ['Could not insert'],
        });
      }
    } catch (err) {
      console.log(err);
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }

  static async removeMember(request, response) {   
    try {
      const memberid = request.params.user_id;
      const groupid = request.params.group_id;
      console.log({ memberid, groupid });
      const data = await GroupMember.delete({ memberid, groupid });
      if (data.length > 0) {
        response.send({
          status: 200,
          data,
        });
      } else {
        response.send({
          status: 406,
          error: ['Record does not exist'],
        });
      }
    } catch (err) {
      console.log(err);
      response.send({
        status: 500,
        error: ['Internal Error'],
      });
    }
  }
}
export default GroupController;
