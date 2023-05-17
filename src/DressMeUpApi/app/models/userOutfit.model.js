module.exports = (sequelize, Sequelize) => {
  const UserOutfit = sequelize.define("UserOutfit", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    outfitId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Outfits',
        key: 'id'
      }
    },
    liked: {
      type: Sequelize.BOOLEAN
    },
    disliked: {
      type: Sequelize.BOOLEAN
    },
    saved: {
      type: Sequelize.BOOLEAN
    }
  }, { 
    timestamps: false 
  });

  return UserOutfit;
};