import handleCommands from "./commands"

import 'dotenv/config'
import {createServer} from "http"
import { Server } from "socket.io"
const httpServer = createServer()
console.log("Starting witchBot")
import tmi from 'tmi.js';
const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [process.env.TWITCH_USERNAME]
});

const io = new Server(httpServer, {
    cors: {
        origin: true
    }

})
console.log("Websocket server ready on port", process.env.WEBSOCKET_PORT)
io.on("connection", (socket) => {
    console.log("a client connected")
})
io.listen(parseInt(process.env.WEBSOCKET_PORT));



client.connect();

const reformatMessage = (message)=>{
    return {
        ...message,
        displayName: message['display-name']
    }
}
client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self){ tags = {...tags, id: Math.random()*100000}}
    io.emit("message", reformatMessage({ message, ...tags }))
    if(self) return;
    // match to commands
    const lowercaseMessage = message.toLowerCase()

    if(/!/.test(lowercaseMessage) === false){
        console.log("not a command")
        return
    }

    handleCommands({client, channel, tags, lowercaseMessage})

});

const sendEvent = (event, params) => {
    io.emit("event", {event, params})
}

// Events
client.on("anongiftpaidupgrade", (channel, username, userstate) => {
    sendEvent("anongiftpaidupgrade", {userstate, username})
});
client.on("cheer", (channel, userstate, message) => {
    sendEvent("cheer", {userstate, message})
});
client.on("clearchat", (channel) => {
    sendEvent("clearchat", {})
});
client.on("emoteonly", (channel, enabled) => {
    sendEvent("emoteonly", {})
});
client.on("followersonly", (channel, enabled, length) => {
    sendEvent("followersonly", {})
});
client.on("giftpaidupgrade", (channel, username, sender, userstate) => {
    sendEvent("giftpaidupgrade", {username, userstate})
});
client.on("hosted", (channel, username, viewers, autohost) => {
    sendEvent("hosted", {username, viewers })
});
client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
    sendEvent("messagedeleted", {deletedMessage})
});
client.on("raided", (channel, username, viewers) => {
    sendEvent("raided", { username, viewers})
});
client.on("resub", (channel, username, months, message, userstate, methods) => {
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    sendEvent("resub", {username, message, months, userstate})
});
client.on("slowmode", (channel, enabled, length) => {
    sendEvent("slowmode", {})
});
client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    sendEvent("subgift", {username, recipient, senderCount})
});
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    sendEvent("submysterygift", {username, numbOfSubs, senderCount})
});
client.on("subscribers", (channel, enabled) => {
    sendEvent("subscribers", {})
});
client.on("subscription", (channel, username, method, message, userstate) => {
    sendEvent("subscription", {username, message, method, userstate})
});
client.on("timeout", (channel, username, reason, duration, userstate) => {
    sendEvent("timeout", {})
});
