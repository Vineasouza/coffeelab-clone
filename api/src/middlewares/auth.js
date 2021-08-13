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

  authByRoles(roles) {
    return async (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ erro: "Token não informado" });
      }

      const [, token] = authHeader.split(" ");

      jwt.verify(token, process.env.APP_SECRET, (err, user) => {
        if (err) {
          res.json({ success: false, message: "Token inválido ou expirado" });
        } else {
          if (!roles.includes(user.type))
            return res.status(401).json({
              erro: "Esse usuário não possúi privilégios suficientes para executar essa ação!",
            });
          req.user = user;
          req.role = user.type === 0 ? "admin" : "user";
          next();
        }
      });
    };
  },
};
