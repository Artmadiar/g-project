const db = require('../')();

module.exports = () => {
  db.user.count()
  .then((count) => {
    if (count === 0) {
      return db.user.create({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin'
      });
    }
  })
  .catch(err => console.error(err));
};
