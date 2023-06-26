// 1. import your command here
import helloCommand from './commands/hello';
import socialsCommand from './commands/socials';

const handleCommands = ({client, channel, tags, lowercaseMessage}) => {
    // 2. assign it to be handled here
   // helloCommand({client, channel, tags, lowercaseMessage});
   socialsCommand({client, channel, tags, lowercaseMessage});
   // TODO
   // go live notification to discord

};

export default handleCommands

