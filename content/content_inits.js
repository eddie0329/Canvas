/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * Initiation of all scripts
 *
 ******************************************************************************/

//common
let DEBUG = null;

//initialization for painting
let canvas = null;
let ctx = null;
let painting = null;
let mode = null;
let currentColor = "rgba(255, 0, 0)";

//initialization for color picker
let canvasColorPicker = null;
let ctxColorPicker = null;
let rgba = null;
let zoom = null;
let ctxZoom = null;
let cross = null;
let ctxCross = null;

//initialization for capture
let canvasCapture = null;
let ctxCapture = null;
let canvasX = null;
let canvasY = null;
let lastMouseX = (lastMouseY = null);
let mouseX = (mouseY = null);
let mousedown = null;
let width = null;
let height = null;
let canvasTarget = null;
let ctxTarget = null;
let imageData = null;
let scrollCapture = null;
let resizeCapture = null;
