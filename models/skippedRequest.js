module.exports = function (sequelize, DataTypes) {
  return sequelize.define('skippedRequest', {
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
    externalUserId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typeOfChat: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'skippedRequest',
    timestamps: true,
  });
};
