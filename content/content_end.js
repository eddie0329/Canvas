/*
 *
 * Copyright Eddie Sunny
 * Released under the MIT license
 *
 * Script Execution Flow
 * elmimination of all dom that were ought to be used for Canvas
 *
 ******************************************************************************/

if (document.querySelector("#canvas__paint") !== null) {
  document.querySelector("#canvas__paint").remove();
}
if (document.querySelector("#canvas__capture") !== null) {
  document.querySelector("#canvas__capture").remove();
}
if (document.querySelector("#canvas__target") !== null) {
  document.querySelector("#canvas__target").remove();
}
if (document.querySelector("#zoom") !== null) {
  document.querySelector("#zoom").remove();
}
if (document.querySelector("#cross") !== null) {
  document.querySelector("#cross").remove();
}
if (document.querySelector("#canvas__colorPicker") !== null) {
  document.querySelector("#canvas__colorPicker").remove();
}
