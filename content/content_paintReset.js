/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * if canvas__paint created go 1) else go 2) -> 1)reset canvas->
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
} else {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
