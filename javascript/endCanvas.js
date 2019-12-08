/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * listener called -> if script excute in denied page, go 2) else 1) ->
 * 1) hide sidebar -> excute content script
 * 2) alert message
 *
 ******************************************************************************/

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
      alert(ALERT_PAGE_DENIED);
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
