/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * listener called -> if script excute in denied page go 2) else 1) ->
 * 1) excute content script
 * 2) toast message
 *
 ******************************************************************************/

document.getElementById('refreshIcon').addEventListener('click', () => {
	whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message == 'paint null') {
			// create notification
			// let notifOptionsOp = {
			//   type: "basic",
			//   iconUrl: "../images/logo.png",
			//   title: "Canvas",
			//   message: "Paint 버튼을 먼저 눌러 주세요!!"
			// };

			// whale.notifications.create("limitNotif", notifOptionsOp);

			$('.toast').toast('dispose');
			$('.toast-body').text(PRESS_PAINT_FIRST);
			$('.toast').toast({ delay: 2100 });
			$('.toast').toast('show');

			sendResponse('option');
		}
		return true;
	});

	whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
		if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
			alert(ALERT_PAGE_DENIED);
			return false;
		} else {
			whale.scripting.executeScript({
				target: { tabId: tab[0].id },
				files: ['content/content_paintReset.js'],
			});
		}
	});
});
