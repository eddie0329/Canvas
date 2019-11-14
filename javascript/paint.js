// command key 
// alt + shift + d
whale.commands.onCommand.addListener(function(command) {
  if (command === `drawing`) {
    whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
      if (
        tab[0].url.match(/chrome:*/gi) ||
        tab[0].url.match(/store.whale.*/gi) 
      ) {
        alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
        return false;
      } else {
        const paintColor = document.querySelector("#paintColor");
        paintColor.style = "background: rgba(255, 0, 0, 0.5)";

        whale.sidebarAction.hide();

        whale.tabs.executeScript({
          file: "content/content_paint.js"
        });
      }
    });
  }
});

document.querySelector("#paintButton").addEventListener("click", () => {
  whale.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
    if (
      tab[0].url.match(/chrome:*/gi) ||
      tab[0].url.match(/store.whale.*/gi) 
    ) {
      alert("이 페이지에는 'Canvas'를 사용할수 없습니다.");
      return false;
    } else {
      const paintColor = document.querySelector("#paintColor");
      paintColor.style = "background: rgba(255, 0, 0, 0.5)";

      whale.sidebarAction.hide();

      whale.tabs.executeScript({
        file: "content/content_paint.js"
      });
    }
  });
});
