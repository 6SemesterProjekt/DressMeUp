const db = require("../models");
const Clothes = db.clothes;

exports.create = (req, res) => {
    // validate request
    if (!req.body.clothesType) {
        res.status(400).send(
            { message: "content cannot be empty!" }
        );
        return;
    }

    Clothes.create(req.body)
      .then(data => { 
        res.send(data); 
      })
      .catch(error => {
          res.status(500).send({
              message: error.message || "Some error accurred while trying to create clothes."
          });
      });
}

exports.getAllClothes = (req, res) => {
  var condition = req.query.clothesType ? 
  { clothesType: req.query.clothesType } : null;

    Clothes.findAll(
      {
        where: condition 
      }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clothes."
            });
        });
};

exports.getClothesById = (req, res) => {
    const id = req.params.id;

    Clothes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving clothes with id=" + id
            });
        });
};

exports.deleteClothes = (req, res) => {
    const id = req.params.id;

    Clothes.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Clothes deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete clothes with id=${id}. Clothes not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete clothes with id=" + id
            });
        });

};

exports.updateClothes = (req, res) => {
    Clothes.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result=> {
        if(result == 1){
            Clothes.findByPk(req.params.id)
            .then(data=>{
                res.status(200).send(data);
              })
              .catch(error=>{
                res.status(400).send('Could not get the updated clothes due to an error. ' + error.message);
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
}
