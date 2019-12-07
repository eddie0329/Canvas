canvasCapture = document.querySelector("#canvas__capture");

if (canvasCapture === null) {
  //create element for canvasCapture
  canvasCapture = document.createElement("canvas");
  canvasCapture.id = "canvas__capture";
  document.body.after(canvasCapture);
}

//resizing
canvasCapture.height = window.innerHeight;
canvasCapture.width = window.innerWidth;

canvasCapture.style =
  "position: absolute; z-index:9999; top: 0; left: 0; cursor: crosshair;";

//widnow height
canvasCapture.style.marginTop = `${document.documentElement.scrollTop}px`;
canvasCapture.style.marginLeft = `${document.documentElement.scrollLeft}px`;

ctxCapture = canvasCapture.getContext("2d");

// drawing image into canvas
function drawImg(imgData) {
  return new Promise(
    function reslove() {
      var imageObj = new Image();
      imageObj.onload = function() {
        let ratio = window.devicePixelRatio;

        // drawing on canvas
        ctxCapture.drawImage(
          imageObj,
          0,
          0,
          canvasCapture.width * ratio,
          canvasCapture.height * ratio,
          0,
          0,
          canvasCapture.width,
          canvasCapture.height
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
canvasX = parseInt(canvasCapture.style.left);
canvasY = parseInt(canvasCapture.style.top);
mousedown = false;
lastMouseX = lastMouseY = 0;
mouseX = mouseY = 0;

//mousedown
canvasCapture.addEventListener("mousedown", function(e) {
  lastMouseX = parseInt(e.clientX);
  lastMouseY = parseInt(e.clientY);
  mousedown = true;
});

//Mouseup
canvasCapture.addEventListener("mouseup", function(e) {
  mousedown = false;
  //create canvasTarget and provide its id
  canvasTarget = document.createElement("canvas");
  canvasTarget.id = "canvas__target";

  //insert canvasTarget into browser
  document.body.after(canvasTarget);

  //define the style
  canvasTarget.width = width;
  canvasTarget.height = height;
  canvasTarget.style = "position: absolute; z-index: -100; top: 0; left: 0;";
  canvasTarget.contentEditable = true;

  //get context of canvasTarget
  ctxTarget = canvasTarget.getContext("2d");

  let image = new Image();

  //image onload function that drawing target image into canvasTarget
  image.onload = function() {
    let ratio = window.devicePixelRatio;

    ctxTarget.drawImage(
      image,
      lastMouseX * ratio,
      lastMouseY * ratio,
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
    canvasTarget.toBlob(function(blob) {
      const item = new ClipboardItem({ "image/png": blob });
      // exception that website prohibit to capture
      if (navigator.clipboard === undefined) {
        alert("이 페이지에서는 캡쳐를 사용하지 못합니다.");
        return false;
      }
      navigator.clipboard.write([item]);
    });
    canvasTarget.remove();
    canvasCapture.remove();

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
canvasCapture.addEventListener("mousemove", function(e) {
  mouseX = parseInt(e.clientX - canvasX);
  mouseY = parseInt(e.clientY - canvasY);
  if (mousedown) {
    //clear canvas
    ctxCapture.clearRect(0, 0, canvasCapture.width, canvasCapture.height);
    ctxCapture.beginPath();
    width = mouseX - lastMouseX;
    height = mouseY - lastMouseY;
    ctxCapture.fillStyle = "rgba(255, 0, 0, 0.1)";
    ctxCapture.rect(lastMouseX, lastMouseY, width, height);
    ctxCapture.fillRect(lastMouseX, lastMouseY, width, height);
    ctxCapture.strokeStyle = "red";
    ctxCapture.lineWidth = 2;
    ctxCapture.stroke();
  }
});

scrollCapture = () => {
  //clear canvas
  ctxCapture.clearRect(0, 0, canvasCapture.width, canvasCapture.height);

  //adjusting cavnas when user scroll vertical
  canvasCapture.style.marginTop = `${document.documentElement.scrollTop}px`;

  //adjusting cavnas when user scroll horizontal
  canvasCapture.style.marginLeft = `${document.documentElement.scrollLeft}px`;

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
