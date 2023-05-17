const db = require("../models");
const Fabric = db.fabrics;

exports.create = (req, res) => {
    const fabric = {
        name: req.body.name,
        id: req.body.id
    }

    Fabric.create(fabric)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error occurred while trying to create fabric."
          });
      });
};

exports.getAllFabrics = (req, res) => {
    Fabric.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving all fabrics."
        });
    });
};

exports.getFabricById = (req, res) => {
    const id = req.params.id;

    Fabric.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving fabric with id=" + id
            });
        });
};

exports.deleteFabric = (req, res) => {
    const id = req.params.id;

    Fabric.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fabric deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete fabric with id=${id}. Fabric not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete fabric with id=" + id
            });
        });

};

exports.updateFabric = (req, res) => {
    Fabric.update({
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
            Fabric.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated fabric due to an error. ' + error.message);
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