const db = require("../models");
const FilterTag = db.filterTags;

exports.create = (req, res) => {
    const filterTag = {
        name: req.body.name,
        id: req.body.id
    }

    FilterTag.create(filterTag)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error occurred while trying to create filterTag."
          });
      });
};

exports.getAllFilterTags = (req, res) => {
    FilterTag.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving all filterTags."
        });
    });
};

exports.getFilterTagById = (req, res) => {
    const id = req.params.id;

    FilterTag.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving filterTag with id=" + id
            });
        });
};

exports.deleteFilterTag = (req, res) => {
    const id = req.params.id;

    FilterTag.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "FilterTag deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete filterTag with id=${id}. FilterTag not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete filterTag with id=" + id
            });
        });

};

exports.updateFilterTag = (req, res) => {
    FilterTag.update({
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
            FilterTag.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated filterTag due to an error. ' + error.message);
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