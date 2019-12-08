/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * if canvasColorPicker is null go 1) else go 2) ->
 * 1) canvasColorPicker, zoom, cross created -> append to its document body ->
 * 2)  ask background to get image of browser ->
 * draw image into canvasColorPicker -> user pick color -> send color
 * information to sidebar app
 *
 ******************************************************************************/

DEBUG = 0; // if DEBUG == 1, DEBUG on

// create canvas and put after body
canvasColorPicker = document.querySelector("#canvas__colorPicker");
zoom = document.querySelector("#zoom");
cross = document.querySelector("#cross");

if (canvasColorPicker === null && zoom === null) {
  //create element for canvasColorPicker
  canvasColorPicker = document.createElement("canvas");
  canvasColorPicker.id = "canvas__colorPicker";
  document.body.append(canvasColorPicker);

  //create element for zoom
  zoom = document.createElement("canvas");
  zoom.id = "zoom";
  document.body.append(zoom);
  //create element for cross
  cross = document.createElement("canvas");
  cross.id = "cross";
  document.body.append(cross);
}

//resizing
canvasColorPicker.height = window.innerHeight;
canvasColorPicker.width = window.innerWidth;

//style of canvas
canvasColorPicker.style =
  "position: absolute; z-index:9000; top: 0; left: 0; cursor: url(http://www.rw-designer.com/cursor-extern.php?id=96791), auto;";
zoom.style =
  "position: absolute; z-index:9010; top: 30px; left: 30px; width: 130px; height: 130px; border-radius: 50%; border: 1px solid red;";
cross.style =
  "position: absolute; z-index:9999; top: 30px; left: 30px; width: 135px; height: 135px; border-radius: 50%;";

//widnow height
canvasColorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
cross.style.marginTop = `${document.documentElement.scrollTop}px`;

//adjusting cavnas when user scroll horizontally
canvasColorPicker.style.marginLeft = `${document.documentElement.scrollLeft}px`;
zoom.style.marginLeft = `${document.documentElement.scrollLeft}px`;
cross.style.marginLeft = `${document.documentElement.scrollLeft}px`;

//contexts define
ctxColorPicker = canvasColorPicker.getContext("2d");
ctxZoom = zoom.getContext("2d");
ctxCross = cross.getContext("2d");

//drawing cross
ctxCross.lineWidth = 1;
ctxCross.strokeStyle = "red";
ctxCross.beginPath();
ctxCross.moveTo(150, 0);
ctxCross.lineTo(150, 146);
ctxCross.moveTo(0, 75);
ctxCross.lineTo(290, 75);
ctxCross.stroke();

//zoom image settings
ctxZoom.imageSmoothingEnabled = true;
ctxZoom.mozImageSmoothingEnabled = false;
ctxZoom.webkitImageSmoothingEnabled = true;
ctxZoom.msImageSmoothingEnabled = true;

// drawing image into canvas
function drawImg(imgData) {
  return new Promise(
    function reslove() {
      var imageObj = new Image();
      imageObj.onload = function() {
        let ratio = window.devicePixelRatio;

        // drawing on canvas
        ctxColorPicker.drawImage(
          imageObj,
          0,
          0,
          canvasColorPicker.width * ratio,
          canvasColorPicker.height * ratio,
          0,
          0,
          canvasColorPicker.width,
          canvasColorPicker.height
        );
      };
      // image to draw
      imageObj.src = imgData;
    },
    function reject() {}
  );
}

// order background script to screenshot the current tab page
whale.runtime.sendMessage("screenshot", response => {
  drawImg(response);
});

// reset the rgba
rgba = "";

function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctxColorPicker.getImageData(x, y, 1, 1);
  var data = pixel.data;
  rgba =
    "rgba(" +
    data[0] +
    ", " +
    data[1] +
    ", " +
    data[2] +
    ", " +
    data[3] / 255 +
    ")";

  ctxZoom.drawImage(
    canvasColorPicker,
    Math.min(Math.max(0, x - 5), canvasColorPicker.width - 10),
    Math.min(Math.max(0, y - 5), canvasColorPicker.height - 10),
    10,
    10,
    0,
    0,
    300,
    300
  );
}

// get rgba data
canvasColorPicker.addEventListener("mousemove", pick);
canvasColorPicker.addEventListener("click", () => {
  document.querySelector("#canvas__colorPicker").remove();
  document.querySelector("#zoom").remove();
  document.querySelector("#cross").remove();
  whale.storage.local.set({ palette1: rgba }, function() {
    if (DEBUG === 1) {
      console.log("Value is set to " + rgba);
    }
  });

  whale.runtime.sendMessage("color picked", response => {
    if (DEBUG === 1) {
      console.log(response);
    }
  });

  //remove all listners
  window.removeEventListener("scroll", scrollCapture);

  window.removeEventListener("resize", resizeCapture);
});

scrollCapture = () => {
  //clear canvas
  ctxColorPicker.clearRect(
    0,
    0,
    canvasColorPicker.width,
    canvasColorPicker.height
  );
  ctxZoom.clearRect(0, 0, zoom.width, zoom.height);
  ctxZoom.clearRect(0, 0, cross.width, cross.height);

  //drawing cross
  ctxZoom.lineWidth = 1;
  ctxZoom.strokeStyle = "red";
  ctxZoom.beginPath();
  ctxZoom.moveTo(150, 0);
  ctxZoom.lineTo(150, 146);
  ctxZoom.moveTo(0, 75);
  ctxZoom.lineTo(290, 75);
  ctxZoom.stroke();

  //adjusting cavnas when user scroll vertically
  canvasColorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
  zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
  cross.style.marginTop = `${document.documentElement.scrollTop}px`;

  //adjusting cavnas when user scroll horizontally
  canvasColorPicker.style.marginLeft = `${document.documentElement.scrollLeft}px`;
  zoom.style.marginLeft = `${document.documentElement.scrollLeft}px`;
  cross.style.marginLeft = `${document.documentElement.scrollLeft}px`;

  setTimeout(() => {
    // order background script to screenshot the current tab page
    whale.runtime.sendMessage("screenshot", response => {
      drawImg(response);
    });
  }, 100);
};

resizeCapture = () => {
  //widnow height
  canvasColorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
  zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
  cross.style.marginTop = `${document.documentElement.scrollTop}px`;

  //resizing
  canvasColorPicker.height = window.innerHeight;
  canvasColorPicker.width = window.innerWidth;

  setTimeout(() => {
    // order background script to screenshot the current tab page
    whale.runtime.sendMessage("screenshot", response => {
      drawImg(response);
    });
  }, 100);
};

//when user scroll its window
window.addEventListener("scroll", scrollCapture);

//when user resize its window
window.addEventListener("resize", resizeCapture);
