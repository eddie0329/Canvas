// let notifOptionsBye = {
//   type: "basic",
//   iconUrl: "../images/logo.png",
//   title: "Canvas",
//   message: "잘가요... 또 올거죠? ㅠㅠ.."
// };

// onclick listener
document.getElementById("endButton").addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_end.js"
      });

      // create notification
      // whale.notifications.create("limitNotif", notifOptionsBye);
    }
  });
});
