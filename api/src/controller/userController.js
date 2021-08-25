const Sequelize = require("sequelize");
const { createUsersModel } = require("../model/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.APP_SECRET, {
    expiresIn: "7d",
  });
};

const index = async (req, res) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Users = createUsersModel(sequelize);

  Users.findAll()
    .then((databases) => {
      sequelize.close();
      res.status(200).json(databases);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

const create = async (req, res) => {
  const newUser = req.body;

  console.table(newUser);

  const hashed = bcrypt.hashSync(newUser.user_password, 8);
  newUser.user_password = hashed;

  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Users = createUsersModel(sequelize);

  const userAlreadyExists = await Users.findOne({
    where: {
      user_email: newUser.user_email,
    },
  });

  if (userAlreadyExists) {
    sequelize.close();
    return res.status(400).json({ errorMessage: "email já cadastrado!" });
  }

  Users.create(newUser)
    .then((user) => {
      user.user_password = undefined;
      sequelize.close();
      res.status(200).json(user);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

const login = async (req, res) => {
  const login = req.body;

  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Users = createUsersModel(sequelize);

  Users.findOne({
    where: {
      user_email: login.user_email,
    },
  })
    .then(async (user) => {
      if (!(await bcrypt.compare(login.user_password, user.user_password))) {
        return res.status(401).json({ erro: "Senha incorreta" });
      }

      const token = generateToken({
        id: user.user_id,
        type: user.user_type,
      });

      sequelize.close();
      res.status(200).json({ email: user.user_email, token });
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = { index, create, update, remove, login };
