const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DressMeUp API" });
});

db.sequelize.sync().then(
  app.listen(PORT,  ()=> {
    console.log(`Server is running on port ${PORT}`)
  })
);