// when canvas is not created
if (document.querySelector("#canvas__paint") === null) {
  whale.runtime.sendMessage("paint null", response => {
    // console.log(response);
  });
} else {
  // define color and mode
  currentColor = "rgba(37, 254, 2)";
  ctx.strokeStyle = currentColor;
  mode = "pen";
  document.querySelector("#canvas__paint").style.cursor =
    "url(http://www.rw-designer.com/cursor-extern.php?id=72974), auto";
}
