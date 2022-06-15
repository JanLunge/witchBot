// 1. import your command here
import helloCommand from './commands/hello';

const handleCommands = ({client, channel, tags, lowercaseMessage}) => {
    // 2. assign it to be handled here
   helloCommand({client, channel, tags, lowercaseMessage});
};

export default handleCommands

