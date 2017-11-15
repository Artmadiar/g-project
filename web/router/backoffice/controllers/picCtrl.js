const errors = require('../../../../libs/errors');

/**
 * GET /pics
 */
exports.list = (req, res, next) => {
  const db = req.db;

  db.pic.findAll({
    include: {
      model: db.picHashtag,
      include: {
        model: db.hashtag
      }
    },
    order: ['id']
  })
  .then((pics) => {
    pics.forEach((pic) => {
      pic.hashtags = pic.picHashtags.map(picHashtag => picHashtag.hashtag.name).join(', ');
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
    picProm = db.pic.findById(id, {
      include: {
        model: db.picHashtag,
        include: {
          model: db.hashtag
        }
      }
    });
  } else {
    picProm = Promise.resolve({ picHashtags: [] });
  }

  const hashtagProm = db.hashtag.findAll();

  Promise.all([picProm, hashtagProm])
  .then(([pic, hashtags]) => {
    if (!pic) {
      throw new errors.NotFound();
    }

    const title = (req.params.id !== 'new') ? `Pic ${pic.name}` : 'New picture';
    const hashtaglist = hashtags.map(hashtag => hashtag.name);
    pic.hashtags = pic.picHashtags.map(picHashtag => picHashtag.hashtag.name).join(', ');

    res.render('picDetail', { title, pic, hashtaglist: JSON.stringify(hashtaglist) });
  })
  .catch((err) => {
    next(err);
  });
};

/**
 * Return promise, which save each pic hashtag
 */
function saveHashtags(db, picId, hashtags) {
  return db.picHashtag.destroy({ where: { picId } })
    .then(() => {
      const proms = hashtags.split(', ').map((hashtag) => {
        return db.hashtag.findOne({ where: { name: hashtag } })
        .then((dbHashtag) => {
          if (!dbHashtag) {
            return db.hashtag.create({ name: hashtag });
          }
          return Promise.resolve(dbHashtag);
        })
        .then((dbHashtag) => {
          return db.picHashtag.create({ picId, hashtagId: dbHashtag.id });
        });
      });

      return Promise.all(proms);
    })
    .catch(err => console.error(err));
}

/**
 * POST /pics
 */
exports.update = (req, res, next) => {
  const db = req.db;

  req.checkBody({
    id: {
      optional: true
    },
    name: {
      notEmpty: true,
      optional: true,
      errorMessage: 'Name is required.'
    },
    url: {
      notEmpty: true,
      optional: true,
      errorMessage: 'Picture is required.'
    },
    externalId: {
      optional: true
    },
    thumbnailUrl: {
      optional: true
    },
    hashtags: {
      optional: true
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
    if (req.body.hashtags) {
      return saveHashtags(db, pic.id, req.body.hashtags);
    }
    return Promise.resolve([]);
  })
  .then(() => {
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
  const id = req.params.id;

  db.picHashtag.destroy({ where: { picId: id } })
  .then(() => db.pic.destroy({ where: { id } }))
  .then(() => res.json({ result: true }))
  .catch(next);
};
