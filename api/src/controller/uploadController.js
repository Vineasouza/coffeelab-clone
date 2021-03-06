const path = require("path");

const create = async (req, res) => {
  if (req.file) {
    const { filename } = req.file;
    res.status(201).send({
      file_path: `${process.env.APP_URL}/uploads/${filename}`,
    });
  } else {
    return res.status(400).send({
      errorMessage: "Falha no upload do arquivo",
    });
  }
};

module.exports = { create };
