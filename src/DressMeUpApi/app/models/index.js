const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clothes = require("./clothes.model.js")(sequelize,Sequelize);
db.outfits = require("./outfit.model.js")(sequelize,Sequelize);

Object.keys(db).forEach(modelName =>{
  if (db[modelName].associate){
    db[modelName].associate(db);
  }
})

module.exports = db;
