module.exports = function (sequelize, DataTypes) {
  return sequelize.define('picHashtag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    picId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pic',
        key: 'id'
      }
    },
    hashtagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hashtag',
        key: 'id'
      }
    },
  }, {
    tableName: 'picHashtag',
    timestamps: true,
  });
};
