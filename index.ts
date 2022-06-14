require('dotenv').config()
// console.log("hello world4", process.env.TWITCH_OAUTH_TOKEN)
console.log("Starting witchBot")
const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'janlunge',
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ['janlunge']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self) return;
    // TODO: display chat

    // match to commands
    const lowercaseMessage = message.toLowerCase()

    if(/!/.test(lowercaseMessage) === false){
        console.log("not a command")
        return
    }

    if(/!hello/.test(lowercaseMessage)) {
        client.say(channel, `@${tags.username}, Yo what's up`);
    }
});
