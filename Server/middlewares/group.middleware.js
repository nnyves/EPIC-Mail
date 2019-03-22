import Group from '../models/group.model';

const groupAuth = async (request, response, next) => {
  try {
    const data = await Group.findGroupAdmin(request.params.group_id);
    if (data.length > 0 && request.user.id === data[0].memberid) {
      next();
    } else {
      response.send({
        status: 401,
        data: ['You are not an admin'],
      });
    }
  } catch (err) {
    response.send({
      status: 500,
      data: ['Internal Error'],
    });
  }
};

export default groupAuth;
