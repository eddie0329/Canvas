// when canvas is not created
if (document.querySelector("#canvas__paint") === null) {
  whale.runtime.sendMessage("paint null", response => {
    console.log(response);
  });
} else {
  // change the mode erasing
  mode = "erasing";
  document.querySelector("#canvas__paint").style.cursor =
    "url(http://www.rw-designer.com/cursor-extern.php?id=72976), auto";
}
