const { DataTypes } = require("sequelize");

const createUsersModel = (DB) => {
  const usersModel = DB.define(
    "Users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_email: {
        type: DataTypes.STRING,
      },
      user_password: {
        type: DataTypes.STRING,
      },
      user_token: {
        type: DataTypes.STRING,
      },
      user_type: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return usersModel;
};

module.exports = { createUsersModel };
