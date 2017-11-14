const errors = require('../../../../libs/errors');

/**
 * GET /pics
 */
exports.list = (req, res, next) => {
  const db = req.db;

  db.pic.findAll({
    include: {
      model: db.picHashtag
    },
    order: ['id']
  })
  .then((pics) => {
    pics.each((pic) => {
      pic.hashtags = pic.picHashtags.map(picHashtag => picHashtag.name).json(', ');
    });

    res.render('picList', { pics });
  })
  .catch(err => next(err));
};

/**
 * GET /pics/:id
 */
exports.detail = (req, res, next) => {
  const db = req.db;
  const id = req.params.id;
  let picProm;

  if (id !== 'new') {
    picProm = db.pic.findById(id, { raw: true });
  } else {
    picProm = Promise.resolve({ hashtags: [] });
  }

  const hashtagProm = db.hashtag.findAll();

  Promise.all([picProm, hashtagProm])
  .then(([pic, hashtags]) => {
    if (!pic) {
      throw new errors.NotFound();
    }

    let title;
    if (req.params.id !== 'new') {
      title = `Pic ${pic.name}`;
    } else {
      title = 'New picture';
    }

    const hashtaglist = hashtags.map(hashtag => hashtag.name);

    res.render('picDetail', { title, pic, hashtaglist: JSON.stringify(hashtaglist) });
  })
  .catch((err) => {
    next(err);
  });
};


/**
 * POST /pics
 */
exports.update = (req, res, next) => {
  const db = req.db;

  req.checkBody({
    name: {
      notEmpty: true,
      optional: true,
      errorMessage: 'Invalid name.'
    }
  });

  req.getValidationResult()
  .then((errs) => {
    if (!errs.isEmpty()) {
      req.flash('errors', errs.array());
      throw new errors.BadRequest();
    }

    if (req.body.id) {
      return db.pic.findById(req.body.id);
    }
    return db.pic.create(req.body);
  })
  .then((pic) => {
    if (!pic) {
      throw new errors.InternalError();
    }
    req.flash('success', { msg: 'Success.' });
    return res.redirect(`${req.baseUrl}/pics`);
  })
  .catch((err) => {
    if (err instanceof errors.BadRequest) {
      return res.redirect(`${req.originalUrl}${req.body.id ? req.body.id : 'new'}`);
    }

    return next(err);
  });
};

/**
 * DELETE /pics/:id
 */
exports.delete = (req, res, next) => {
  const db = req.db;

  db.pic.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.json({ result: true }))
  .catch(next);
};
