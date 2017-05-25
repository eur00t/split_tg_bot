const TeleBot = require('telebot');
const config = require('./config.json');

const bot = new TeleBot({
    token: config.token, // Required. Telegram Bot API token.
    webhook: {
        url: config.webhookUrl,
        host: '127.0.0.1',
        port: '8083'
    }
});

bot.on(/^\/say(@xxlv_bot)? (.+)$/, (msg, props) => {
    const text = props.match[2];
    let arr = text.split(' ');

    if (arr.length > 5) {
        arr = arr.slice(0, 5).concat([arr.slice(5).join(' ')]);
    }

    arr.reduce((def, str) => {
        return def.then(() => {
            bot.sendMessage(msg.chat.id, str);

            return new Promise(resolve => setTimeout(() => resolve(), 1000));
        });
    }, Promise.resolve());
});

bot.start();
