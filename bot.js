const { Telegraf } = require('telegraf');
const bot = new Telegraf('');//сюда помещается токен, который дал botFather

bot.command('start', async(ctx) => {
    let greetingsMessage = `👋 Здравствуй, ${ctx.message.from.first_name}!
🤗 Меня зовут Майя. Я личный секретарь Александра. Он наверняка уже рассказал обо мне.

Чем я могу помочь? ;)`;

    await bot.telegram.sendSticker(ctx.chat.id, 'CAACAgEAAxkBAAIBImJa6-xQ-JCqVYyA19qygLL1DqHTAALoCQACv4yQBOuM7gkYub23JAQ');
    bot.telegram.sendMessage(ctx.chat.id, greetingsMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Доступные команды",
                        callback_data: 'getGreetingsCommands',
                    },

                ],
            ],
        },
    });
});
bot.action('help', (ctx) => {
    // bot.telegram.sendPhoto(ctx.chat.id, {
    //     source: "http://placekitten.com/g/200/300",
    // });
    bot.telegram.sendMessage(ctx.chat.id, 'HELP');
});

bot.command('help', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Раздел помощи находится в разработке', {
    });
});

bot.action('getGreetingsCommands', (ctx) => {
    // bot.telegram.sendPhoto(ctx.chat.id, {
    //     source: "http://placekitten.com/g/200/300",
    // });
    bot.telegram.sendMessage(ctx.chat.id, 'DOG');
});



//method that displays the inline keyboard buttons 

bot.hears('animals', (ctx) => {
    const animalMessage = `great, here are pictures of animals you would love`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "dog",
                        callback_data: 'dog'
                    },
                    {
                        text: "cat",
                        callback_data: 'cat'
                    }
                ],

            ]
        }
    })
})

bot.action('dog', ctx => {
    // bot.telegram.sendPhoto(ctx.chat.id, {
    //     source: "http://placekitten.com/g/200/300",
    // });
    bot.telegram.sendMessage(ctx.chat.id, 'DOG');
});

bot.action('cat', ctx => {
    // bot.telegram.sendPhoto(ctx.chat.id, {
    //     source: "http://placekitten.com/g/200/300",
    // });
    bot.telegram.sendMessage(ctx.chat.id, 'CAT');
});

// ========================================================
const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};
const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};

bot.hears('phone', (ctx, next) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Can we get access to your phone number?', requestPhoneKeyboard);
});

bot.hears("location", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?', requestLocationKeyboard);
});

bot.on('sticker', (ctx) => {
    console.log(ctx.message.sticker);
});
bot.on('text', (ctx) => {
    console.log(ctx.message);
});

// bot.on('text', (ctx) => {
//     ctx.reply(`id: ${ctx.message.from.id}`);
//     ctx.reply(`username: ${ctx.message.from.username}`);
//     ctx.reply(`first_name: ${ctx.message.from.first_name}`);
//     ctx.reply(`is_bot: ${ctx.message.from.is_bot}`);
//     ctx.reply(`language_code: ${ctx.message.from.language_code}`);
//     console.log('ctx.from: ', ctx.from);

//     console.log(ctx);
// });
// bot.on('sticker', (ctx) => ctx.reply('Нахуй мне твой стикер?')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
// bot.hears('hui', (ctx) => ctx.reply('Poshel na hui!'))
bot.launch() // запуск бота