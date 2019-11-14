//initialization for painting
let canvas = null;
let ctx = null;
let painting = null;
let mode = null;
let currentColor = "rgba(255, 0, 0)";

//initialization for color picker
let canvas_colorPicker = null;
let ctx_colorPicker = null;
let rgba = null;
let zoom = null;
let ctx_zoom = null;
let cross = null;
let ctx_cross = null;

//initialization for capture
let canvas_capture = null;
let ctx_capture = null;
let canvasx = null;
let canvasy = null;
let last_mousex = (last_mousey = null);
let mousex = (mousey = null);
let mousedown = null;
let width = null;
let height = null;
let canvas_target = null;
let ctx_target = null;
let imageData = null;
let scrollCapture = null;
let resizeCapture = null;