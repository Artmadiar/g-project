module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pic', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'pic',
    timestamps: true,
  });
};
