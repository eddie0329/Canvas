/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * if message is 'screenshot' go 1)
 * if message is 'openCanvas' go 2)
 * 1) screen shot brower -> send response(image data) to caller
 * 2) show sidebar
 *
 ******************************************************************************/

const DEBUG = 0; // if DEBUG == 1, DEBUG on

//initialize the screenData;
let screenData = "";

//response to take screenshot
whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "screenshot") {
    whale.tabs.captureVisibleTab(data => {
      if (DEBUG === 1) {
        console.log(data);
      }
      screenData = data;
    });

    //sending response
    setTimeout(() => {
      sendResponse(screenData);
    }, 250);

    //clear out the screen data
    screenData = "";
  }
  return true;
});

// open canvas command listener
// alt + shift + o
whale.commands.onCommand.addListener(function(command) {
  if (command === `openCanvas`) {
    whale.sidebarAction.show();
  }
});
