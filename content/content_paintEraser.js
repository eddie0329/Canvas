/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * if canvas__paint created go 1) else go 2) -> 1)change mode for erase ->
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
  // change the mode erasing
  mode = "erasing";
  document.querySelector("#canvas__paint").style.cursor =
    "url(https://www.rw-designer.com/cursor-extern.php?id=72976), auto";
}
