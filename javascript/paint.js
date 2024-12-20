/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * listener called -> if script excute in denied page go 2) else 1) ->
 * 1) set color for drawing -> excute content script
 * 2) alert message
 *
 ******************************************************************************/

// command key
// alt + shift + d
whale.commands.onCommand.addListener(function (command) {
	if (command === `drawing`) {
		whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
			if (
				tab[0].url.match(/chrome:*/gi) ||
				tab[0].url.match(/store.whale.*/gi)
			) {
				alert(ALERT_PAGE_DENIED);
				return false;
			} else {
				const paintColor = document.querySelector('#paintColor');
				paintColor.style = 'background: rgba(255, 0, 0, 0.5)';

				whale.sidebarAction.hide();

				whale.scripting.executeScript({
					target: { tabId: tab[0].id },
					files: ['content/content_paint.js'],
				});
			}
		});
	}
});

document.querySelector('#paintButton').addEventListener('click', () => {
	whale.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
		if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
			alert(ALERT_PAGE_DENIED);
			return false;
		} else {
			const paintColor = document.querySelector('#paintColor');
			paintColor.style = 'background: rgba(255, 0, 0, 0.5)';

			whale.sidebarAction.hide();

			whale.scripting.executeScript({
				target: { tabId: tab[0].id },
				files: ['content/content_paint.js'],
			});
		}
	});
});
