export default ({client, channel, tags, lowercaseMessage}) => {
    if(/!hello/.test(lowercaseMessage)) {
        client.say(channel, `@${tags.username}, Yo what's up`);
    }
}
