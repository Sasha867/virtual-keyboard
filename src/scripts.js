import { createElementKeyboard, createElementPage } from './create-element.js';
import { keysArray } from './keys-array.js';

createElementPage();
createElementKeyboard();
export const textarea = document.querySelector('textarea');
export const buttonArray = document.querySelectorAll('.keyboard__button');
let capsLockState = true;

export const addTextInTextarea = (text) => {
  const cursorPosition = textarea.selectionStart;
  if (text === 'backspace') {
    const textBefore = textarea.value.substring(0, cursorPosition - 1);
    const textAfter = textarea.value.substring(cursorPosition);
    textarea.value = textBefore + textAfter;
    textarea.setSelectionRange(
      cursorPosition > 0 ? cursorPosition - 1 : cursorPosition,
      cursorPosition > 0 ? cursorPosition - 1 : cursorPosition,
    );
    return;
  }
  textarea.value = textarea.value.substring(0, cursorPosition)
    + text
    + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
  textarea.selectionEnd = cursorPosition + text.length;
};

export const buttonsValueToUppercase = () => {
  keysArray.forEach((item) => {
    const buttons = document.getElementById(item.key);
    console.log(buttons);
    if (item.specialValue) {
      buttons.textContent = item.specialValue;
    } else {
      buttons.textContent = buttons.textContent.toLowerCase();
    }
  });
};

function buttonsValueToLowercase() {
  keysArray.forEach((item) => {
    const buttons = document.getElementById(item.key);
    if (item.specialValue) {
      buttons.textContent = item.specialValue;
    } else {
      buttons.textContent = buttons.textContent.toUpperCase();
    }
  });
}

export const capslockMode = () => {
  capsLockState = !capsLockState;
  console.log(capsLockState);
  if (capsLockState) {
    console.log('hi');
    buttonsValueToUppercase();
  } else {
    buttonsValueToLowercase();
  }
};

export const activeButtons = (keyCode) => {
  textarea.focus();
  const button = document.getElementById(keyCode);
  if (keyCode !== 'CapsLock' && button) button.classList.add('active');
  if (keyCode === 'Enter') {
    addTextInTextarea('\n');
    return;
  }
  if (keyCode === 'Space') {
    addTextInTextarea(' ');
    return;
  }
  if (keyCode === 'Tab') {
    addTextInTextarea('\t');
    return;
  }
  if (
    keyCode === 'AltLeft'
    || keyCode === 'AltRight'
    || keyCode === 'ControlLeft'
    || keyCode === 'ControlRight'
  ) {
    return;
  }
  if (keyCode === 'Backspace') {
    addTextInTextarea('backspace');
    return;
  }
  if (keyCode === 'CapsLock') {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    } else {
      button.classList.add('active');
    }
    capslockMode();
    return;
  }
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    if (capsLockState) {
      buttonsValueToLowercase();
    } else {
      buttonsValueToUppercase();
    }
  }
  buttonArray.forEach((item) => {
    if (keyCode === item.id) {
      addTextInTextarea(button.textContent);
    }
  });
};
window.addEventListener('mousedown', (e) => {
  activeButtons(e.target.id);
});

window.addEventListener('mouseup', (e) => {
  textarea.focus();
  if (e.target.id === 'CapsLock') {
    e.stopPropagation();
  } else if (e.target.id) {
    setTimeout(() => {
      document.getElementById(e.target.id).classList.remove('active');
    }, 100);
  }
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  activeButtons(e.code);
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'CapsLock') {
    e.stopPropagation();
  } else {
    document.getElementById(e.code).classList.remove('active');
  }
});
