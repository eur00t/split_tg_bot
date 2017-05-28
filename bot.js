const TeleBot = require('telebot');
const config = require('./config.json');
const btoa = require('btoa');
const express = require('express');
const bodyParser = require('body-parser');

const bot = new TeleBot({
    token: config.token, // Required. Telegram Bot API token.
    webhook: {
        url: config.webhookUrl,
        host: '127.0.0.1',
        port: '8093'
    }
});

const MAX_WORDS = 5;

function decorateBotResult(promise, res) {
    return promise.then(
        (data) => {
            res.send(data.result);
        },
        err => {
            res.status(500).send(err.description);
        }
    );
}

function initExpressApp() {
    const wrap = express();
    const app = express();

    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.post('/setScore', (req, res) => {
        decorateBotResult(
            bot.setGameScore(req.body.from.id, req.body.score, {
                inlineMessageId: req.body.inline_message_id
            }),
            res
        );
    });

    app.post('/getGameHighScores', (req, res) => {
        decorateBotResult(
            bot.getGameHighScores(req.body.from.id, {
                inlineMessageId: req.body.inline_message_id
            }),
            res
        );
    });

    wrap.use('/not_math_battle', app);
    wrap.use((err, req, res, next) => {
        res.status(500).send('');
    });
    wrap.listen(8094);
}

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

const GAMES = {
    not_math_battle: {
        url: 'https://xxlv.party/not_math_battle'
    }
};

bot.on('inlineQuery', msg => {
    let query = msg.query;

    const answers = bot.answerList(msg.id, { cacheTime: 60 });

    Object.keys(GAMES).forEach(key => {
        return answers.addGame({
            type: 'game',
            id: key,
            game_short_name: key
        });
    });

    return bot.answerQuery(answers);
});

function getGameUserData({ inline_message_id, from }) {
    return btoa(JSON.stringify({ inline_message_id, from }));
}

function processGameQuery(q) {
    const game = GAMES[q.game_short_name];

    if (game == null) {
        return { text: 'Game not found' };
    }

    return {
        url: 'https://xxlv.party/not_math_battle#data=' + getGameUserData(q)
    };
}

bot.on('callbackQuery', q => {
    let answer;
    if (q.game_short_name != null) {
        answer = processGameQuery(q);
    } else {
        answer = { text: 'Boom!' };
    }

    bot.answerCallbackQuery(q.id, answer);
});

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
initExpressApp();
