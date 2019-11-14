//initialize the screenData;
let screenData = "";

//response to take screenshot
whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "screenshot") {
    whale.tabs.captureVisibleTab(data => {
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
