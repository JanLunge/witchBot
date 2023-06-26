import obsWebSocket  from "obs-websocket-js"
import robot from "robotjs"
import 'dotenv/config'

// Configure the connection details
const obs = new obsWebSocket();
const obsHost = 'ws://localhost';     // Replace with your OBS host address
const obsPort = 4444;            // Replace with your OBS host port
const obsPassword = process.env.OBS_PASSWORD;  // Replace with your OBS password

// Define the source name in OBS
const sourceName = 'Display 32x9';  // Replace with your source name

export async function updateSourcePosition() {
  // Connect to OBS WebSocket server
  await obs.connect(`${obsHost}:${obsPort}`, obsPassword);
  console.log('Connected to OBS WebSockets for mouse events');
  // Update the position of the source
  const ress = await (obs as any).call('GetSceneItemList', {
    sceneName: '[ S ] PC',
  });
  const id = ress.sceneItems.find((item: any) => item.sourceName === sourceName).sceneItemId;
  // const res = await (obs as any).call('GetSceneItemTransform', {
  //   sceneName: '[ S ] PC',
  //   sceneItemId: id,
  // });
  let lastPos = 0;
  let currentPos = 0;
  while (true) {
  
    // Get the cursor position
    const mousePosition = robot.getMousePos();
    const { x, y } = mousePosition;
    const windowWidth = 1280;

    
    // swap between 3 positions left center right each has a width of 1280
    let xPos;
    if(x < windowWidth){
      currentPos = 0;
      xPos = 0;
    }else if(x < 2*windowWidth){
      currentPos = 1;
      xPos = windowWidth;
    }
    else if(x < 3*windowWidth){
      currentPos = 2;
      xPos = 2*windowWidth;
    }else{
      currentPos = 3;
      xPos = 3*windowWidth;
    }
    let slide = y > 940 ? 500: 0;
    if(y < 1444 && lastPos !== currentPos){
      let scale = 1.05
    await (obs as any).call('SetSceneItemTransform', {
      sceneName: '[ S ] PC',
      sceneItemId: id,
      sceneItemTransform: {
        cropBottom: 0,
        cropLeft: xPos,
        cropRight: 0,
        cropTop: 22, //+ slide,
        height: 1440,
        positionX: 580,
        positionY: 0,
        rotation: 0,
        scaleX: scale,
        scaleY: scale,
        sourceHeight: 1440,
        sourceWidth: 5120,
        width: 5120
      }
    });
    lastPos = currentPos;
    console.log(`Updated source position: (${x}, ${y})`);

  }


    await new Promise(resolve => setTimeout(resolve, 400));  // Adjust the delay as needed
  }

  // Disconnect from OBS WebSocket server
  await obs.disconnect();
}

