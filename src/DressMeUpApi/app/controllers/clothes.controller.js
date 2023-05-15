const db = require("../models");
const Clothes = db.clothes;

exports.create = async (req, res) => {
    // validate request
    if (!req.body.name || !req.body.clothesType) {
        res.status(400).send(
            { message: "Name and type are required." }
        );
        return;
    }

    try {
        // create the new Clothes record
        const newCloth = await Clothes.create({
            clothesType: req.body.clothesType,
            brand: req.body.brand,
            image: req.body.image,
            name: req.body.name
        });

        // add the associated items to the join tables (many-to-many)
        await newCloth.setColors(req.body.colors);
        await newCloth.setSeasons(req.body.seasons);
        await newCloth.setFabrics(req.body.fabrics);
        await newCloth.setFilterTags(req.body.filterTags);

        console.log(req.body);
        console.log(newCloth);
        res.send(newCloth);

    } catch (error) {
        console.log(req.body)
        console.log(error);
        res.status(500).send({
            message: error.message || "Some error accurred while trying to create clothes."
        });
    }
}

exports.getAllClothes = (req, res) => {
    var condition = req.query.clothesType ?
        { clothesType: req.query.clothesType } : null;


    Clothes.findAll({
        where: condition,
        include: {
            all: true,
            through: { attributes: [] }
        }
    })
        .then(data => {
            /* var bufferBase64 = new Buffer(req.image.blob, 'binary').toString('base64');
            req.image = bufferBase64; */


            //const buffer = Buffer.from('Hello World');
            //const blob = bufferToBlob(buffer);
            //data.res.image = bufferToBlob(data.req.image);

            // const b64 = Buffer.from(rest.Body).toString('base64');
            // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
            //const mimeType = 'image/png'; // e.g., image/png
            //data.res.image = `<img src="data:${mimeType};base64,${b64}" />`;

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

    Clothes.findByPk(id, {
        include: {
            all: true,
            through: { attributes: [] }
        }
    })
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
        where: {
            id: id
        }
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
    Clothes.update({
        clothesType: req.body.clothesType,
        brand: req.body.brand,
        image: req.body.image
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result == 1) {
                Clothes.findByPk(req.params.id, {
                    include: {
                        all: true,
                        through: { attributes: [] }
                    }
                })
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        res.status(400).send('Could not get the updated clothes due to an error. ' + error.message);
                    })
            }
            else {
                res.satus(400).send('An error occurred during update.')
            }
        })
        .catch(error => {
            res.status(400).send({
                message: error.message || "An error occured during update."
            })
        })
};
