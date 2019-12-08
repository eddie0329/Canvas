/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * if canvas__paint created go 1) else go 2) -> 1)change color for drawing ->
 * 2) send message that canvas__paint is null
 *
 ******************************************************************************/

DEBUG = 0; // if DEBUG == 1, DEBUG on

// when canvas is not created
if (document.querySelector("#canvas__paint") === null) {
  whale.runtime.sendMessage("paint null", response => {
    if (DEBUG === 1) {
      console.log(response);
    }
  });
}

if (document.querySelector("#canvas__paint") !== null) {
  // define the color
  currentColor = "rgba(255, 0, 0)";
  ctx.strokeStyle = currentColor;
  mode = "pen";
  document.querySelector("#canvas__paint").style.cursor =
    "url(http://www.rw-designer.com/cursor-extern.php?id=72974), auto";
}
