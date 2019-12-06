// create canvas and put after body
canvas_colorPicker = document.querySelector("#canvas__colorPicker");
zoom = document.querySelector("#zoom");
cross = document.querySelector("#cross");

if (canvas_colorPicker === null && zoom === null) {
  //create element for canvas_colorPicker
  canvas_colorPicker = document.createElement("canvas");
  canvas_colorPicker.id = "canvas__colorPicker";
  document.body.append(canvas_colorPicker);

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
canvas_colorPicker.height = window.innerHeight;
canvas_colorPicker.width = window.innerWidth;

//style of canvas
canvas_colorPicker.style =
  "position: absolute; z-index:9000; top: 0; left: 0; cursor: url(http://www.rw-designer.com/cursor-extern.php?id=96791), auto;";
zoom.style =
  "position: absolute; z-index:9010; top: 30px; left: 30px; width: 130px; height: 130px; border-radius: 50%; border: 1px solid red;";
cross.style =
  "position: absolute; z-index:9999; top: 30px; left: 30px; width: 135px; height: 135px; border-radius: 50%;";

//widnow height
canvas_colorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
cross.style.marginTop = `${document.documentElement.scrollTop}px`;

//adjusting cavnas when user scroll horizontally
canvas_colorPicker.style.marginLeft = `${document.documentElement.scrollLeft}px`;
zoom.style.marginLeft = `${document.documentElement.scrollLeft}px`;
cross.style.marginLeft = `${document.documentElement.scrollLeft}px`;

//contexts define
ctx_colorPicker = canvas_colorPicker.getContext("2d");
ctx_zoom = zoom.getContext("2d");
ctx_cross = cross.getContext("2d");

//drawing cross
ctx_cross.lineWidth = 1;
ctx_cross.strokeStyle = "red";
ctx_cross.beginPath();
ctx_cross.moveTo(150, 0);
ctx_cross.lineTo(150, 146);
ctx_cross.moveTo(0, 75);
ctx_cross.lineTo(290, 75);
ctx_cross.stroke();

//zoom image settings
ctx_zoom.imageSmoothingEnabled = true;
ctx_zoom.mozImageSmoothingEnabled = false;
ctx_zoom.webkitImageSmoothingEnabled = true;
ctx_zoom.msImageSmoothingEnabled = true;

// drawing image into canvas
function drawImg(imgData) {
  return new Promise(
    function reslove() {
      var imageObj = new Image();
      imageObj.onload = function() {
        let ratio = window.devicePixelRatio;

        // drawing on canvas
        ctx_colorPicker.drawImage(
          imageObj,
          0,
          0,
          canvas_colorPicker.width * ratio,
          canvas_colorPicker.height * ratio,
          0,
          0,
          canvas_colorPicker.width,
          canvas_colorPicker.height
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
  var pixel = ctx_colorPicker.getImageData(x, y, 1, 1);
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

  ctx_zoom.drawImage(
    canvas_colorPicker,
    Math.min(Math.max(0, x - 5), canvas_colorPicker.width - 10),
    Math.min(Math.max(0, y - 5), canvas_colorPicker.height - 10),
    10,
    10,
    0,
    0,
    300,
    300
  );
}

// get rgba data
canvas_colorPicker.addEventListener("mousemove", pick);
canvas_colorPicker.addEventListener("click", () => {
  document.querySelector("#canvas__colorPicker").remove();
  document.querySelector("#zoom").remove();
  document.querySelector("#cross").remove();
  whale.storage.local.set({ palette6: rgba }, function() {
    // console.log("Value is set to " + rgba);
  });

  whale.runtime.sendMessage("color picked", response => {
    // console.log(response);
  });

  //remove all listners
  window.removeEventListener("scroll", scrollCapture);

  window.removeEventListener("resize", resizeCapture);
});

scrollCapture = () => {
  //clear canvas
  ctx_colorPicker.clearRect(
    0,
    0,
    canvas_colorPicker.width,
    canvas_colorPicker.height
  );
  ctx_zoom.clearRect(0, 0, zoom.width, zoom.height);
  ctx_cross.clearRect(0, 0, cross.width, cross.height);

  //drawing cross
  ctx_cross.lineWidth = 1;
  ctx_cross.strokeStyle = "red";
  ctx_cross.beginPath();
  ctx_cross.moveTo(150, 0);
  ctx_cross.lineTo(150, 146);
  ctx_cross.moveTo(0, 75);
  ctx_cross.lineTo(290, 75);
  ctx_cross.stroke();

  //adjusting cavnas when user scroll vertically
  canvas_colorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
  zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
  cross.style.marginTop = `${document.documentElement.scrollTop}px`;

  //adjusting cavnas when user scroll horizontally
  canvas_colorPicker.style.marginLeft = `${document.documentElement.scrollLeft}px`;
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
  canvas_colorPicker.style.marginTop = `${document.documentElement.scrollTop}px`;
  zoom.style.marginTop = `${document.documentElement.scrollTop}px`;
  cross.style.marginTop = `${document.documentElement.scrollTop}px`;

  //resizing
  canvas_colorPicker.height = window.innerHeight;
  canvas_colorPicker.width = window.innerWidth;
};

//when user scroll its window
window.addEventListener("scroll", scrollCapture);

//when user resize its window
window.addEventListener("resize", resizeCapture);
