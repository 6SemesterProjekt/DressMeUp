const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const db = require("./app/models");

require("./app/routes/clothes.routes")(app);
require("./app/routes/outfits.routes")(app);
require("./app/routes/colors.routes")(app);
require("./app/routes/fabrics.routes")(app);
require("./app/routes/seasons.routes")(app);
require("./app/routes/filterTags.routes")(app);
require("./app/routes/users.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DressMeUp API" });
});

db.sequelize.sync().then(
  app.listen(PORT,  ()=> {
    console.log(`Server is running on port ${PORT}`)
  })
);