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
  }, {
    tableName: 'skippedRequest',
    timestamps: true,
  });
};
