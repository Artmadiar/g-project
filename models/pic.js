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
  }, {
    tableName: 'pic',
    timestamps: true,
  });
};
