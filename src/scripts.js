import {
  checkLanguage,
  createElementKeyboard,
  createElementPage,
  currentLanguage,
  toggleLanguage,
} from './create-element.js';
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

export const buttonsValueToUppercase = (keyCode) => {
  keysArray.forEach((item) => {
    const buttons = document.getElementById(item.key);
    if (item.valueRu || item.valueEng) {
      buttons.textContent = buttons.textContent.toUpperCase();
    }
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      if (item.specialValue) {
        buttons.textContent = item.specialValue;
      }
    }
  });
};

function buttonsValueToLowercase(keyCode) {
  keysArray.forEach((item) => {
    const buttons = document.getElementById(item.key);
    if (item.valueRu || item.valueEng) {
      buttons.textContent = buttons.textContent.toLowerCase();
    }
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      if (item.specialValue) {
        if (currentLanguage.language === 'eng') {
          buttons.textContent = item.valueEng || item.value;
        } else {
          buttons.textContent = item.valueRu || item.value;
        }
      }
    }
  });
}

export const capslockMode = () => {
  capsLockState = !capsLockState;
  if (capsLockState) {
    buttonsValueToLowercase();
  } else {
    buttonsValueToUppercase();
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
      buttonsValueToUppercase();
    } else {
      buttonsValueToLowercase();
    }
    // buttonsValueToUppercase(keyCode);
    return;
  }
  if (keyCode === 'Delete') {
    return;
  }
  if (keyCode === 'MetaLeft') {
    return;
  }
  buttonArray.forEach((item) => {
    if (keyCode === item.id) {
      addTextInTextarea(button.textContent);
    }
  });
};

window.addEventListener('mousedown', (e) => {
  if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
    buttonsValueToUppercase(e.target.id);
  }
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
  if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
    buttonsValueToLowercase(e.target.id);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    buttonsValueToUppercase(e.code);
  }
  e.preventDefault();
  activeButtons(e.code);
  if (
    document.getElementById('AltLeft').classList.contains('active')
    && document.getElementById('ControlLeft').classList.contains('active')
  ) {
    if (!e.repeat) {
      toggleLanguage();
      checkLanguage();
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'CapsLock') {
    e.stopPropagation();
  } else {
    document.getElementById(e.code).classList.remove('active');
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    buttonsValueToLowercase(e.code);
  }
});
