export default ({client, channel, tags, lowercaseMessage}) => {
    if(/!(printers)($| )/.test(lowercaseMessage)) {
        client.say(channel, `wlard has 2 Prusa printers, an MK2S and MK3S`);
    }
    if(/!(filament)($| )/.test(lowercaseMessage)) {
        client.say(channel, `where I get my filament: https://www.dasfilament.de/`);
    }
    if(/!(diode)($| )/.test(lowercaseMessage)) {
        client.say(channel, `I got my 1N4148 diodes here: https://www.amazon.de/gp/product/B012ACSC1O`);
    }
    if(/!(keyboards)($| )/.test(lowercaseMessage)) {
        client.say(channel, `all my keyboards are 3d printed and you can find the source files here on github https://github.com/wlard and more on my youtube channel https://youtube.com/c/JanLunge`);
    }
}

