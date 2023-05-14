const db = require("../models");
const Color = db.colors;

exports.create = (req, res) => {
    const color = {
        name: req.body.name,
        id: req.body.id
    }

    Color.create(color)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error occurred while trying to create color."
          });
      });
};

exports.getAllColors = (req, res) => {
    Color.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving all colors."
        });
    });
};

exports.getColorById = (req, res) => {
    const id = req.params.id;

    Color.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving color with id=" + id
            });
        });
};

exports.deleteColor = (req, res) => {
    const id = req.params.id;

    Color.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Color deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete color with id=${id}. Color not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete color with id=" + id
            });
        });

};

exports.updateColor = (req, res) => {
    Color.update({
        name: req.body.name,
        id: req.body.id
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(result=> {
        if(result == 1){
            Color.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated color due to an error. ' + error.message);
              })
        }
        else {
            res.satus(400).send('An error occurred during update.')
        }
    })
    .catch(error=>{
        res.status(400).send({
          message: error.message || "An error occured during update."
        })
    })
};