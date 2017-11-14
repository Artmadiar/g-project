const router = require('express').Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('express-flash');
const errors = require('../../../libs/errors');
const auth = require('../../auth/passportLocal');

const redisStoreConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  logErrors: true
};

router.use(cookieParser());
router.use(session({
  store: new RedisStore(redisStoreConfig),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

router.use((req, res, next) => {
  if (!req.session) {
    throw new errors.SessionError();
  }
  next();
});

router.use(flash());

router.use(auth.passport.initialize());
router.use(auth.passport.session());

// Set user returned from passport.deserializeUser
router.use((req, res) => {
  const loginUrl = '/backoffice/login';

  if ((req.originalUrl !== loginUrl) && (req.user === undefined)) {
    return res.redirect(loginUrl);
  }

  res.locals.user = req.user || null;
});

/**
 * Controllers
 */
const userController = require('./controllers/userCtrl');
const picController = require('./controllers/picCtrl');

/**
 * Backoffice routes
 */
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  req.session.returnTo = req.originalUrl;
  next();
});

router.use(auth.isAuthenticated); // only authorized
router.get('/', (req, res) => res.redirect(`${req.baseUrl}/pics`));
router.get('/logout', userController.logout);

router.get('/pics', picController.list);
router.get('/pics/:id', picController.detail);
router.post('/pics', picController.update);
router.delete('/pics/:id', picController.delete);

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
