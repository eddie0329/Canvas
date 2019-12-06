canvas_capture = document.querySelector("#canvas__capture");

if (canvas_capture === null) {
  //create element for canvas_capture
  canvas_capture = document.createElement("canvas");
  canvas_capture.id = "canvas__capture";
  document.body.after(canvas_capture);
}

//resizing
canvas_capture.height = window.innerHeight;
canvas_capture.width = window.innerWidth;

canvas_capture.style =
  "position: absolute; z-index:9999; top: 0; left: 0; cursor: crosshair;";

//widnow height
canvas_capture.style.marginTop = `${document.documentElement.scrollTop}px`;
canvas_capture.style.marginLeft = `${document.documentElement.scrollLeft}px`;

ctx_capture = canvas_capture.getContext("2d");

// drawing image into canvas
function drawImg(imgData) {
  return new Promise(
    function reslove() {
      var imageObj = new Image();
      imageObj.onload = function() {
        let ratio = window.devicePixelRatio;

        // drawing on canvas
        ctx_capture.drawImage(
          imageObj,
          0,
          0,
          canvas_capture.width * ratio,
          canvas_capture.height * ratio,
          0,
          0,
          canvas_capture.width,
          canvas_capture.height
        );
      };
      // image to draw
      imageObj.src = imgData;
    },
    function reject() {}
  );
}

imageData = null;

// order background script to screenshot the current tab page
whale.runtime.sendMessage("screenshot", response => {
  drawImg(response);
  imageData = response;
});

// defining the variables
canvasx = parseInt(canvas_capture.style.left);
canvasy = parseInt(canvas_capture.style.top);
mousedown = false;
last_mousex = last_mousey = 0;
mousex = mousey = 0;

//Mousedown
canvas_capture.addEventListener("mousedown", function(e) {
  last_mousex = parseInt(e.clientX);
  last_mousey = parseInt(e.clientY);
  mousedown = true;
});

//Mouseup
canvas_capture.addEventListener("mouseup", function(e) {
  mousedown = false;
  //create canvas_target and provide its id
  canvas_target = document.createElement("canvas");
  canvas_target.id = "canvas__target";

  //insert canvas_target into browser
  document.body.after(canvas_target);

  //define the style
  canvas_target.width = width;
  canvas_target.height = height;
  canvas_target.style = "position: absolute; z-index: -100; top: 0; left: 0;";
  canvas_target.contentEditable = true;

  //get context of canvas_target
  ctx_target = canvas_target.getContext("2d");

  let image = new Image();

  //image onload function that drawing target image into canvas_target
  image.onload = function() {
    let ratio = window.devicePixelRatio;

    ctx_target.drawImage(
      image,
      last_mousex * ratio,
      last_mousey * ratio,
      width * ratio,
      height * ratio,
      0,
      0,
      width,
      height
    );
  };

  image.src = imageData;

  //remove all elements that were inserted
  setTimeout(() => {
    //copy the image
    canvas_target.toBlob(function(blob) {
      const item = new ClipboardItem({ "image/png": blob });
      // exception that website prohibit to capture
      if (navigator.clipboard === undefined) {
        alert("이 페이지에서는 캡쳐를 사용하지 못합니다.");
        return false;
      }
      navigator.clipboard.write([item]);
    });
    canvas_target.remove();
    canvas_capture.remove();

    window.removeEventListener("scroll", scrollCapture);
    //send message for notification
    if (navigator.clipboard !== undefined) {
      whale.runtime.sendMessage("capture completed", response => {
        // console.log(response);
      });
    }
  }, 100);
});

//Mousemove
canvas_capture.addEventListener("mousemove", function(e) {
  mousex = parseInt(e.clientX - canvasx);
  mousey = parseInt(e.clientY - canvasy);
  if (mousedown) {
    //clear canvas
    ctx_capture.clearRect(0, 0, canvas_capture.width, canvas_capture.height);
    ctx_capture.beginPath();
    width = mousex - last_mousex;
    height = mousey - last_mousey;
    ctx_capture.fillStyle = "rgba(255, 0, 0, 0.1)";
    ctx_capture.rect(last_mousex, last_mousey, width, height);
    ctx_capture.fillRect(last_mousex, last_mousey, width, height);
    ctx_capture.strokeStyle = "red";
    ctx_capture.lineWidth = 2;
    ctx_capture.stroke();
  }
});

scrollCapture = () => {
  //clear canvas
  ctx_capture.clearRect(0, 0, canvas_capture.width, canvas_capture.height);

  //adjusting cavnas when user scroll vertical
  canvas_capture.style.marginTop = `${document.documentElement.scrollTop}px`;

  //adjusting cavnas when user scroll horizontal
  canvas_capture.style.marginLeft = `${document.documentElement.scrollLeft}px`;

  setTimeout(() => {
    // order background script to screenshot the current tab page
    whale.runtime.sendMessage("screenshot", response => {
      drawImg(response);
      imageData = response;
    });
  }, 100);
};

// when user scroll its window
window.addEventListener("scroll", scrollCapture);
