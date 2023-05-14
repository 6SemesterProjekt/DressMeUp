const db = require("../models");
const Season = db.seasons;

exports.create = (req, res) => {
    const season = {
        name: req.body.name,
        id: req.body.id
    }

    Season.create(season)
    .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error occurred while trying to create season."
          });
      });
};

exports.getAllSeasons = (req, res) => {
    Season.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving all seasons."
        });
    });
};

exports.getSeasonById = (req, res) => {
    const id = req.params.id;

    Season.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving season with id=" + id
            });
        });
};

exports.deleteSeason = (req, res) => {
    const id = req.params.id;

    Season.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Season deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete season with id=${id}. Season not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete season with id=" + id
            });
        });

};

exports.updateSeason = (req, res) => {
    Season.update({
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
            Season.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated season due to an error. ' + error.message);
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