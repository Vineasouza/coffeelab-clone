const Sequelize = require("Sequelize");
const { createMoviesModel } = require("../model/moviesModel");
const uuid = require("uuid");

/** Lista todos os filmes existentes na base de dados */
const index = async (req, res) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Movies = createMoviesModel(sequelize);

  Movies.findAll()
    .then((databases) => {
      sequelize.close();
      res.status(200).json(databases);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

/** Cria um filme e armazena na base de dados */
const create = async (req, res) => {
  const newMovie = req.body;

  const movie_id = uuid.v4();

  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Movies = createMoviesModel(sequelize);

  Movies.create({ ...newMovie, mov_id: movie_id })
    .then((movie) => {
      sequelize.close();
      res.status(200).json(movie);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

/** Atualiza um filme existente na base de dados a partir de sua UUID*/
const update = async (req, res) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Movies = createMoviesModel(sequelize);

  const {
    mov_title,
    mov_original_title,
    mov_original_title_romanised,
    mov_release_date,
    mov_description,
    mov_director,
    mov_posterurl,
  } = req.body;

  Movies.update(
    {
      mov_title,
      mov_original_title,
      mov_original_title_romanised,
      mov_release_date,
      mov_description,
      mov_director,
      mov_posterurl,
    },
    {
      where: {
        mov_id: req.params.id,
      },
    }
  )
    .then((movie) => {
      sequelize.close();
      res.status(200).json(movie);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

/** Remove um filme da base de dados a partir de sua UUID*/
const remove = async (req, res) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Movies = createMoviesModel(sequelize);

  Movies.destroy({
    where: {
      mov_id: req.params.id,
    },
  })
    .then((movie) => {
      sequelize.close();
      res.status(200).json(movie);
    })
    .catch((err) => {
      sequelize.close();
      return res.status(400).json({ errorMessage: err.message });
    });
};

module.exports = { index, create, update, remove };
