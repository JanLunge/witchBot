export default ({client, channel, tags, lowercaseMessage}) => {
    if(/!(socials|yt|youtube)($| )/.test(lowercaseMessage)) {
        client.say(channel, `find me on youtube at https://youtube.com/JanLunge`);
    }
    if(/!(discord)($| )/.test(lowercaseMessage)) {
        client.say(channel, `join my discord for updates https://discord.gg/ctYr5BVF7b`);
    }
    if(/!(blog)($| )/.test(lowercaseMessage)) {
        client.say(channel, `here is my blog where I gather resources for the projects I work on https://blog.heaper.de`);
    }
    if(/!(insta)($| )/.test(lowercaseMessage)) {
        client.say(channel, `Check out wlard his insta: https://www.instagram.com/janlunge/`);
    }
    
}
