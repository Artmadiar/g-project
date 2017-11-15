const moment = require('moment');

/**
 * GET /skippedRequests
 */
exports.list = (req, res, next) => {
  const db = req.db;

  db.skippedRequest.findAll()
  .then((reqs) => {
    res.locals.moment = moment;
    res.render('skippedRequstList', { reqs });
  })
  .catch(err => next(err));
};

