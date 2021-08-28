const jwt = require("jsonwebtoken");

module.exports = {
  async auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ erro: "Token não informado" });
    }

    const [, token] = authHeader.split(" ");

    jwt.verify(token, process.env.APP_SECRET, function (err, decoded) {
      if (err) {
        res.json({ success: false, message: "Token inválido ou expirado" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  },
};
