const { readToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    //   console.log(req.headers);
    const { access_token } = req.headers;
    const payload = readToken(access_token);
    // console.log(payload, "===========");
    const getUser = await User.findByPk(payload.id);

    // console.log(getUser, "<<<<<<<<<<<<<<<<");
    if (!getUser) {
      throw { name: "Authentification Failed", statusCode: 401 };
    } else {
      req.user = {
        id: getUser.id,
        email: getUser.email,
        role: getUser.role,
      };
      // console.log(req.user, "<<<<<<<<<<");
      next();
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authentication;
