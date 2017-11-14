// const auth = require('../../../auth/passportLocal');

/**
 * GET /login
 */
exports.getLogin = (req, res) => {
  return res.render('login', {
    title: 'Login'
  });
};

/**
 * POST /login
 */
exports.postLogin = (req, res, next) => {
  req.assert('username', 'Invalid username.').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect(`${req.baseUrl}/login`);
  }

  // auth.passport.authenticate('local', (err, user, info) => {
  //   if (err) return next(err);

  //   if (!user) {
  //     req.flash('errors', info);
  //     return res.redirect(`${req.baseUrl}/login`);
  //   }

  //   req.login(user, (err) => {
  //     if (err) { return next(err); }

  //     req.flash('success', { msg: 'Success! You are logged in.' });
  //     res.redirect(req.session.returnTo || req.baseUrl);
  //   });
  // })(req, res, next);
};

/**
 * GET /logout
 */
exports.logout = (req, res) => {
  req.logout();
  req.flash('success', { msg: 'Success! You are logged in.' });
  res.redirect(req.baseUrl);
};
