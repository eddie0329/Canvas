document.getElementById("eraserButton").addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (
      tab[0].url.match(/chrome:*/gi) ||
      tab[0].url.match(/store.whale.*/gi) 
    ) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      whale.tabs.executeScript({
        file: "content/content_paintEraser.js"
      });
    }
  });
});
