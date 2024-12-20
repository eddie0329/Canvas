/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * listener called -> if script excute in denied page, go 2) else 1) ->
 * 1) excute content script
 * 2) toast message
 *
 ******************************************************************************/

//when canvas is not created
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

// popover function for bootstrap
$(document).ready(function () {
	$('#paintColor').popover();
	$('#paintColor').tooltip({
		placement: 'bottom',
		title: 'Color Options',
		trigger: 'hover',
	});
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

// main color
let drawingColor = document.querySelector('#paintColor');

//when dom tree changed -> because of the popover

function callback() {
	// defining the variables
	const paintColorOption1 = document.querySelector('#paintColorOption1');

	// return if popover does not appear in the window
	if (paintColorOption1 === null) {
		return;
	}

	// choosing option 1
	$('#paintColorOption1').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(255, 0, 0, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption1.js'],
				});
			}
		});
	});

	// choosing option 2
	$('#paintColorOption2').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(253, 137, 0, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption2.js'],
				});
			}
		});
	});

	// choosing option 3
	$('#paintColorOption3').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(250, 255, 0, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption3.js'],
				});
			}
		});
	});

	// choosing option 4
	$('#paintColorOption4').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(37, 254, 2, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption4.js'],
				});
			}
		});
	});

	// choosing option 5
	$('#paintColorOption5').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(0, 206, 251, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption5.js'],
				});
			}
		});
	});

	// choosing option 6
	$('#paintColorOption6').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(5, 0, 255, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption6.js'],
				});
			}
		});
	});

	// choosing option 7
	$('#paintColorOption7').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(112, 0, 255, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption7.js'],
				});
			}
		});
	});

	// choosing option 8
	$('#paintColorOption8').click(() => {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				//change the main color
				drawingColor.style.background = 'rgba(255, 0, 214, 0.5)';
				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paintColorOption8.js'],
				});
			}
		});
	});
}

const observer = new MutationObserver(callback);
const config = { attributes: true, childList: true, subtree: true };
observer.observe(document.body, config);
