const DB = require('../models');
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
    const db = DB();

    return db.pic.findOne({ where: { name: text } })
    .then((pic) => {
      if (!pic) {
        return Promise.all([
          db.skippedRequest.create({ name: text }),
          ctx.reply(`Sorry, we don't have product with the title "${text}"!`)
        ]);
      }

      return ctx.replyWithPhoto({ url: pic.url });
    })
    .catch(err => console.error(err));
  });

  bot.startPolling();
  console.log('[TELEGRAM BOT IS RUNNING] TIME: %s', Date());

  return bot;
};
