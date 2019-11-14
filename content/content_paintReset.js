// when canvas is not created
if (document.querySelector("#canvas__paint") === null) {
  whale.runtime.sendMessage("paint null", response => {
    console.log(response);
  });
} else {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
