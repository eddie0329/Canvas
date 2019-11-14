whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "color picked") {
    // create notification
    // let notifOptionsCaptureCompleted = {
    //   type: "basic",
    //   iconUrl: "../images/logo.png",
    //   title: "Canvas",
    //   message: "'색상'이 선택 되었습니다."
    // };
    // whale.notifications.create("limitNotif", notifOptionsCaptureCompleted);

    $(".toast").toast('dispose');
    $(".toast-body").text("'색상'이 선택 되었습니다.");
    $(".toast").toast({delay: 2100});
    $(".toast").toast('show');

    whale.sidebarAction.show();
    sendResponse("color picked");
  }
  return true;
});

//function that convert rgb to hex
function rgbToHex(rgbType) {
  // extract color value and ,
  let rgb = rgbType.replace(/[^%,.\d]/g, "");

  // get values divided by ,
  rgb = rgb.split(",");

  // if color described as % then convert to regurlar
  for (let x = 0; x < 3; x++) {
    if (rgb[x].indexOf("%") > -1)
      rgb[x] = Math.round(parseFloat(rgb[x]) * 2.55);
  }

  // convert to hex
  let toHex = function(string) {
    string = parseInt(string, 10).toString(16);
    string = string.length === 1 ? "0" + string : string;

    return string;
  };

  var r = toHex(rgb[0]);
  var g = toHex(rgb[1]);
  var b = toHex(rgb[2]);

  var hexType = "#" + r + g + b;

  return hexType;
}

/****************************PALETTE COLOR 1***********************************/
//defining the paletteColor1
let paletteColor1 = document.querySelector("#paletteColor1");
let paletteColor1_style = getComputedStyle(paletteColor1);

paletteColor1.setAttribute(
  "title",
  `${paletteColor1_style["background-color"]}`
);

//palette Color 1 listner (click)
paletteColor1.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker1.js"
      });
    }
  });
});

//palette Color 1 command listner
whale.commands.onCommand.addListener(function(command) {
  if (command === `colorPicker`) {
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
          file: "content/content_colorPicker1.js"
        });
      }
    });
  }
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette1 == null || changes.palette1 == undefined) {
    return;
  }
  for (palette1 in changes) {
    var storageChange = changes[palette1];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor1.style.background = storageChange.newValue;
  paletteColor1.setAttribute(
    "title",
    `${paletteColor1_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 2***********************************/
//defining the paletteColor2
let paletteColor2 = document.querySelector("#paletteColor2");
let paletteColor2_style = getComputedStyle(paletteColor2);

paletteColor2.setAttribute(
  "title",
  `${paletteColor2_style["background-color"]}`
);

//palette Color 2 listner (click)
paletteColor2.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker2.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette2 === null || changes.palette2 === undefined) {
    return;
  }
  for (palette2 in changes) {
    var storageChange = changes[palette2];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor2.style.background = storageChange.newValue;
  paletteColor2.setAttribute(
    "title",
    `${paletteColor2_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 3***********************************/
//defining the paletteColor3
let paletteColor3 = document.querySelector("#paletteColor3");
let paletteColor3_style = getComputedStyle(paletteColor3);

paletteColor3.setAttribute(
  "title",
  `${paletteColor3_style["background-color"]}`
);

//palette Color 3 listner (click)
paletteColor3.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker3.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette3 === null || changes.palette3 === undefined) {
    return;
  }
  for (palette3 in changes) {
    var storageChange = changes[palette3];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor3.style.background = storageChange.newValue;
  paletteColor3.setAttribute(
    "title",
    `${paletteColor3_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 4***********************************/
//defining the paletteColor4
let paletteColor4 = document.querySelector("#paletteColor4");
let paletteColor4_style = getComputedStyle(paletteColor4);

paletteColor4.setAttribute(
  "title",
  `${paletteColor4_style["background-color"]}`
);

//palette Color 4 listner (click)
paletteColor4.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker4.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette4 === null || changes.palette4 === undefined) {
    return;
  }
  for (palette4 in changes) {
    var storageChange = changes[palette4];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor4.style.background = storageChange.newValue;
  paletteColor4.setAttribute(
    "title",
    `${paletteColor4_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 5***********************************/
//defining the paletteColor5
let paletteColor5 = document.querySelector("#paletteColor5");
let paletteColor5_style = getComputedStyle(paletteColor5);

paletteColor5.setAttribute(
  "title",
  `${paletteColor5_style["background-color"]}`
);

//palette Color 5 listner (click)
paletteColor5.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker5.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette5 === null || changes.palette5 === undefined) {
    return;
  }
  for (palette5 in changes) {
    var storageChange = changes[palette5];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor5.style.background = storageChange.newValue;
  paletteColor5.setAttribute(
    "title",
    `${paletteColor5_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 6***********************************/
//defining the paletteColor6
let paletteColor6 = document.querySelector("#paletteColor6");
let paletteColor6_style = getComputedStyle(paletteColor6);

paletteColor6.setAttribute(
  "title",
  `${paletteColor6_style["background-color"]}`
);

//palette Color 6 listner (click)
paletteColor6.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker6.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette6 === null || changes.palette6 === undefined) {
    return;
  }
  for (palette6 in changes) {
    var storageChange = changes[palette6];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor6.style.background = storageChange.newValue;
  paletteColor6.setAttribute(
    "title",
    `${paletteColor6_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 7***********************************/
//defining the paletteColor7
let paletteColor7 = document.querySelector("#paletteColor7");
let paletteColor7_style = getComputedStyle(paletteColor7);

paletteColor7.setAttribute(
  "title",
  `${paletteColor7_style["background-color"]}`
);

//palette Color 7 listner (click)
paletteColor7.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker7.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette7 === null || changes.palette7 === undefined) {
    return;
  }
  for (palette7 in changes) {
    var storageChange = changes[palette7];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor7.style.background = storageChange.newValue;
  paletteColor7.setAttribute(
    "title",
    `${paletteColor7_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/

/****************************PALETTE COLOR 8***********************************/
//defining the paletteColor8
let paletteColor8 = document.querySelector("#paletteColor8");
let paletteColor8_style = getComputedStyle(paletteColor8);

paletteColor8.setAttribute(
  "title",
  `${paletteColor8_style["background-color"]}`
);

//palette Color 8 listner (click)
paletteColor8.addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (tab[0].url.match(/chrome:*/gi) || tab[0].url.match(/store.whale.*/gi)) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.sidebarAction.hide();
      whale.tabs.executeScript({
        file: "content/content_colorPicker8.js"
      });
    }
  });
});

// storage messaging
whale.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.palette8 === null || changes.palette8 === undefined) {
    return;
  }
  for (palette8 in changes) {
    var storageChange = changes[palette8];
  }
  // get hex value
  let hex = rgbToHex(storageChange.newValue);

  paletteColor8.style.background = storageChange.newValue;
  paletteColor8.setAttribute(
    "title",
    `${paletteColor8_style["background-color"]} \n ${hex}`
  );
});
/******************************************************************************/
