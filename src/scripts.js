import { createElementKeyboard, createElementPage } from './create-element.js';
import { keysArray } from './keys-array.js';

createElementPage();
createElementKeyboard();
const textarea = document.querySelector('textarea');

export const addTextInTextarea = (text) => {
  const newValue = textarea.value.substring(0, textarea.selectionStart)
    + text
    + textarea.value.substring(textarea.selectionStart, textarea.value.length);
  textarea.value = newValue;
};

window.addEventListener('click', ({ target }) => {
  console.log(target.id);
  keysArray.forEach((item) => {
    if (
      item.valueRu === target.textContent
      || item.valueEng === target.textContent
      || item.value === target.textContent
      || item.specialValue === target.textContent
    ) {
      addTextInTextarea(target.textContent);
    }
  });
});

document.addEventListener('keydown', (e) => {
  console.log(e.code);
  document.getElementById(e.code).classList.add('active');
  textarea.focus();
});

document.addEventListener('keyup', (e) => {
  document.getElementById(e.code).classList.remove('active');
});
