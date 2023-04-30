import { createElementKeyboard, createElementPage } from './create-element.js';

createElementPage();
createElementKeyboard();

// function keyPress(e) {
//   let keyNum;
//   if (window.event) {
//     keyNum = window.event.code;
//   } else if (e) {
//     keyNum = e.which;
//   }
//   console.log(keyNum);
// }
// document.onkeydown = keyPress;
