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

    $(".toast").toast('dispose');
    $(".toast-body").text("선택된 영역이 '클립보드'에 저장 되었습니다");
    $(".toast").toast({delay: 2100});
    $(".toast").toast('show');

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
        alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
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
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_capture.js"
      });
    }
  });
});
