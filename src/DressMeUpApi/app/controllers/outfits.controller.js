const db = require("../models");
const Outfit = db.outfits;

exports.create = (req, res) => {
    const outfit = {
        likes: req.body.likes,
        dislikes: req.body.dislikes
    }

    Outfit.create(outfit)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error accurred while trying to create outfit."
          });
      });
};

exports.getAllOutfits = (req, res) => {
    Outfit.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving all outfits."
        });
    });
};

exports.getOutfitById = (req, res) => {
    const id = req.params.id;

    Outfit.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving outfit with id=" + id
            });
        });
};

exports.deleteOutfit = (req, res) => {
    const id = req.params.id;

    Outfit.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Outfit deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete outfit with id=${id}. Outfit not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete outfit with id=" + id
            });
        });

};

exports.updateOutfit = (req, res) => {
    Outfit.update({
        likes: req.body.likes,
        dislikes: req.body.dislikes
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(result=> {
        if(result == 1){
            Outfit.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated outfit due to an error. ' + error.message);
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