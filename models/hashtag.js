module.exports = function (sequelize, DataTypes) {
  return sequelize.define('hashtag', {
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
    tableName: 'hashtag',
    timestamps: true,
  });
};
