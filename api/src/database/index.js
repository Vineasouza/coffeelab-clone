const pg = require("pg");

console.log(pg);

pg.pull.connect(process.env.DATABASE_URL);

// pg.set("useCreateIndex", true);

// pg.Promise = global.Promise;

module.exports = pg;
