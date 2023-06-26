# witchbot
a twitch bot backend forwarding chat and other events to the frontend at [twitch-overlay](https://github.com/JanLunge/twitch-overlay)
this directly manages the obs source if you enable the mouse tracking for splitting a 32x9 screen into 4 1280x1440 sections
and automatically align the source to the cursor


## features
### mouse tracking
![mouse tracking](./demo/cursor_track.gif)

### custom commands
you can add your own commands in the command directory and then attach them to the command.ts


## setup
generate a token with https://twitchapps.com/tmi/
and fill the .env file based on the .env.example
