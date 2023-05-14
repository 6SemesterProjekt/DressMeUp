const db = require("../models");
const Users = db.users;

exports.create = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        fullName: req.body.fullName,
    }

    User.create(user)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error occurred while trying to create user."
          });
      });
}

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    
    Users.findByPk(userId)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + userId
            });
        }
        );
};

exports.getAllUsers = (req, res) => {
    Users.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving all users"
            });
        }
        );
}

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    Users.destroy({
        where: { id: userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${userId}. Maybe user was not found!`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + userId
            });
        }
        );
}

exports.updateUser = (req, res) => {
    const userId = req.params.id;

    Users.update(req.body, {
        where: { id: userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`
                });
            }
        }
        )
        .catch(err => {
            res.status(500).send({
                message: "Could not update user with id=" + userId
            });
        }
        );
}