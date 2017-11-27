const db = require('../models')();
const Telegraf = require('telegraf');

module.exports = () => {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

  // START
  bot.command('start', ctx => ctx.reply('Welcome!'));


  // HELP
  bot.command('help', ctx => ctx.reply('Just send me title of product you need.'));


  // TEXT MESSAGE
  bot.on('text', (ctx) => {
    const text = ctx.message.text;

    // find frist 5 products by name
    const findByName = db.pic.findAll({ where: { name: { $iLike: text } }, limit: 5 });
    // find frist 5 products by hashtags
    const findByHashtag = db.hashtag.findAll({
      limit: 5,
      where: { name: { $iLike: text } },
      include: {
        model: db.picHashtag,
        include: {
          model: db.pic
        }
      }
    });

    Promise.all([findByName, findByHashtag])
    .then(([picsByName, picsByHashtag]) => {
      if ((!picsByName || picsByName.length === 0) && (!picsByHashtag || picsByHashtag.length === 0)) {
        return Promise.all([
          db.skippedRequest.create({
            name: text,
            externalUserId: ctx.chat.id,
            firstName: ctx.chat.first_name,
            lastName: ctx.chat.last_name,
            username: ctx.chat.username,
            typeOfChat: ctx.chat.type
          }),
          ctx.reply(`Sorry, we don't have product with the title "${text}"!`)
        ]);
      }

      // concat two finded pic arrays
      let results = picsByName;
      picsByHashtag.forEach(hashtag => hashtag.picHashtags.forEach((picHashtag) => {
        // take only unique pics
        if (!results.find(pic => pic.id === picHashtag.pic.id)) {
          results.push(picHashtag.pic);
        }
      }));

      // control count of products
      if (results.length > 5) {
        results = results.slice(0, 5);
      }

      // TODO: check on existing files by url
      // ...

      // return promises of answers on message
      return Promise.all(results.map(async (result) => {
        const sendPic = await ctx.replyWithPhoto({ url: result.url });
        const sendUrl = await ctx.reply(result.productUrl);

        return Promise.all([sendPic, sendUrl]);
      }));

      // return ctx.replyWithMediaGroup(results.map(result => ({
      //   media: { url: result.url },
      //   caption: result.productUrl,
      //   type: 'photo'
      // })));
    })
    .catch(err => console.error(err));
  });

  // RUN THE BOT
  bot.startPolling();
  console.log('[TELEGRAM BOT IS RUNNING] TIME: %s', Date());

  return bot;
};
