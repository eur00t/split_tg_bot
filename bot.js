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

const MAX_WORDS = 5;

function getWords(text) {
    const arr = [];
    let i = 0;
    let j = 0;
    while (i < text.length && arr.length < MAX_WORDS) {
        while (i < text.length && text[i] !== ' ') {
            i += 1;
        }
        arr.push(text.slice(j, i));
        while (i < text.length && text[i] === ' ') {
            i += 1;
        }
        j = i;
    }

    if (i < text.length) {
        arr.push(text.slice(i));
    }

    return arr;
}

bot.on(/^\/say(@xxlv_bot)? ([\s\S]+)$/m, (msg, props) => {
    const text = (props.match[2] || '')
        .replace(/\s+/g, ' ')
        .replace(/(^\s+)|(\s+$)/g, '');

    const arr = getWords(text);

    arr.reduce((def, str) => {
        return def.then(() => {
            bot.sendMessage(msg.chat.id, str);

            return new Promise(resolve => setTimeout(() => resolve(), 1000));
        });
    }, Promise.resolve());
});

bot.start();
