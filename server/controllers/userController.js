const { User } = require("../models/");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken, verifyToken } = require("../helper/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const data = await User.create({ name, email, password });
      res.status(201).json({ id: data.id, name: data.name, email: data.email });
    } catch (error) {
      if (error) {
        if (error.name === "SequelizeValidationError") {
          let arrErrors = [];
          for (let i = 0; i < error.errors.length; i++) {
            arrErrors.push(error.errors[i].message);
          }
          next({ status: 400, message: `${arrErrors}` });
        } else if (error.name === "SequelizeUniqueConstraintError") {
            next({ status: 400, message: error.message });
        }
        next(error)
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) next({ status: 404, message: "please input your email!" });
      if (!password) next({ status: 404, message: "please input your password!" });
      const data = await User.findOne({ where: { email } });
      if (!data) next({ status: 401, message: "account not found!" });
      else if (comparePassword(password, data.password)) {
        const access_token = generateToken({ id: data.id, email: data.email });
        res
          .status(200)
          .json({
            id: data.id,
            name: data.name,
            email: data.email,
            access_token,
          });
      } else if (!comparePassword(password, data.password)) {
        next({ status: 401, message: "Invalid email/password" });
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController;
