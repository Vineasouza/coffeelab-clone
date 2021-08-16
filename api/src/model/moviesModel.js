const { DataTypes } = require("sequelize");

const createMoviesModel = (DB) => {
  const moviesModel = DB.define(
    "Movies",
    {
      mov_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      mov_title: {
        type: DataTypes.STRING,
      },
      mov_original_title: {
        type: DataTypes.STRING,
      },
      mov_original_title_romanised: {
        type: DataTypes.STRING,
      },
      mov_release_date: {
        type: DataTypes.STRING,
      },
      mov_description: {
        type: DataTypes.STRING,
      },
      mov_director: {
        type: DataTypes.STRING,
      },
      mov_posterurl: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "movies",
      timestamps: false,
    }
  );

  return moviesModel;
};

module.exports = { createMoviesModel };
