module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();

    // Create a new user
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.getAllUsers);

    // Retrieve user by id
    router.get("/:id", users.getUserById);

    // Delete user with id
    router.delete("/:id", users.deleteUser);

    // Update user
    router.put("/:id", users.updateUser);

    app.use('/api/users', router);
}