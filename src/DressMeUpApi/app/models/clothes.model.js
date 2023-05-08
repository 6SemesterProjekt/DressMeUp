module.exports = (sequelize, Sequelize) => {
  const Clothes = sequelize.define("Clothes", {
    clothesType: {
      type: Sequelize.INTEGER
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('color').split(';')
        },
        set(val) {
           this.setDataValue('color',val.join(';'));
        }
    },
    fabric: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('fabric').split(';')
        },
        set(val) {
           this.setDataValue('fabric',val.join(';'));
        }
    },
    seasons: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('seasons').split(';')
        },
        set(val) {
           this.setDataValue('seasons',val.join(';'));
        }
    },
    filterTags: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('filterTags').split(';')
        },
        set(val) {
           this.setDataValue('filterTags',val.join(';'));
        }
    },
    brand: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
  });
  return Clothes;
};