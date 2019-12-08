/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * listener called -> if script excute in denied page, go 2) else 1) ->
 * 1) hide sidebar -> excute content script -> show sidebar -> if capture
 *    success, toast message
 * 2) alert message
 *
 ******************************************************************************/

//when canvas is not created
whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "capture completed") {
    // // create notification
    // let notifOptionsCaptureCompleted = {
    //   type: "basic",
    //   iconUrl: "../images/logo.png",
    //   title: "Canvas",
    //   message: "선택된 영역이 '클립보드'에 저장 되었습니다"
    // };

    // whale.notifications.create("limitNotif", notifOptionsCaptureCompleted);

    $(".toast").toast("dispose");
    $(".toast-body").text(CAPTURE_SUCCESS);
    $(".toast").toast({ delay: 2100 });
    $(".toast").toast("show");

    whale.sidebarAction.show();
    sendResponse("capture completed");
  }
  return true;
});

//command listener
// alt + shift + c
whale.commands.onCommand.addListener(function(command) {
  if (command === `capture`) {
    whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
      if (
        tab[0].url.match(/chrome:*/gi) ||
        tab[0].url.match(/store.whale.*/gi)
      ) {
        alert(ALERT_PAGE_DENIED);
        return false;
      } else {
        whale.sidebarAction.hide();
        whale.tabs.executeScript({
          file: "content/content_capture.js"
        });
      }
    });
  }
});

//click listener
document.getElementById("captureButton").addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (
      tab[0].url.match(/chrome:*/gi) ||
      tab[0].url.match(/store.whale.*/gi)
      // || tab[0].url.match(/whale:*/gi)
    ) {
      alert(ALERT_PAGE_DENIED);
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_capture.js"
      });
    }
  });
});
