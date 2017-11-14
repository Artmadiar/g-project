const router = require('express').Router();
const bodyParser = require('body-parser');
const contentType = require('../middlewares/contentTypeValidator');
const backofficeRouter = require('./backoffice');
const db = require('../../models')();

router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// Content type validation
router.use(contentType({
  types: ['application/json', 'application/x-www-form-urlencoded']
}));

router.use('/', (req, res, next) => {
  req.db = db;
  return next();
});

router.get('/', (req, res) => res.redirect(`${req.baseUrl}/backoffice/pics`));
router.use('/backoffice', backofficeRouter);

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
