canvas = document.querySelector("#canvas__paint");

// if canvas not created -> create canvas
if (document.querySelector("#canvas__paint") === null) {
  canvas = document.createElement("canvas");
  canvas.id = "canvas__paint";
  document.body.append(canvas);
  canvas = document.querySelector("#canvas__paint");
  //resizing
  canvas.height = document.documentElement.scrollHeight;
  canvas.width = window.innerWidth;

  //style of canvas
  canvas.style =
    "position: absolute; z-index:8000; top: 0; left: 0; cursor: url(http://www.rw-designer.com/cursor-extern.php?id=72974), auto;";
  ctx = canvas.getContext("2d");
}


// define the color
setTimeout(() => {
  ctx.strokeStyle = "rgba(255, 0, 0)";
}, 5);

//variables
painting = false;
mode = "pen";

// mouse down -> start to draw
function startDrawing(e) {
  painting = true;
  drawing(e);
}

// drawing -> painting = true
function drawing(e) {
  if (!painting) {
    return;
  }
  if (mode === "pen") {
    ctx.globalCompositeOperation = "source-over";

    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.pageX, e.pageY);
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(e.pageX, e.pageY, 8, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
// mouse up -> end to draw
function endDrawing() {
  painting = false;
  //reset
  ctx.beginPath();
}

// setTimeout(()=> {}, 10)
//Event Listners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mousemove", drawing);

//window resized
window.addEventListener("resize", () => {
  //resizing
  canvas.height = document.documentElement.scrollHeight;
  canvas.width = window.innerWidth;
});

// //window scrolled
// window.addEventListener("scroll", () => {
//   if(document.documentElement.scrollHeight !== canvas.height) {
//     canvas.height = document.documentElement.scrollHeight;
//   }
// })
