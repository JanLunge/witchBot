export default ({client, channel, tags, lowercaseMessage}) => {
    if(/!dis/.test(lowercaseMessage)) {
        client.say(channel, `dis is streaming on twitch check him out https://www.twitch.tv/disastertron`);
    }
    if(/!becca/.test(lowercaseMessage)) {
        client.say(channel, `becca is streaming on twitch check her out https://www.twitch.tv/bossinbecca`);
    }
}