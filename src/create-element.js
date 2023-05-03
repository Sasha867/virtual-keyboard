import { keysArray } from './keys-array.js';
// import { currentLanguage } from './scripts.js';

export const createElementPage = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.prepend(wrapper);
  const title = document.createElement('h1');
  title.textContent = 'RSS Virtual-keyboard';
  title.classList.add('wrapper__title');
  wrapper.prepend(title);
  const textarea = document.createElement('textarea');
  textarea.classList.add('wrapper__textarea');
  title.after(textarea);
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  textarea.after(keyboard);
  const description = document.createElement('p');
  description.textContent = 'Клавиатура создана в операционной системе Window.'
  + ' Для переключения языка комбинацию: левые alt + ctrl.';
  description.classList.add('wrapper__description');
  keyboard.after(description);
};

export const currentLanguage = {
  language: localStorage.getItem('language') || 'eng',
};

export const toggleLanguage = () => {
  currentLanguage.language = currentLanguage.language === 'eng' ? 'ru' : 'eng';
  localStorage.setItem('language', currentLanguage.language);
};

export const createElementKeyboard = () => {
  const keyboard = document.getElementsByClassName('keyboard')[0];
  keysArray.forEach((item) => {
    const button = document.createElement('button');
    if (currentLanguage.language === 'eng') {
      button.textContent = item.valueEng || item.value;
    } else {
      button.textContent = item.valueRu || item.value;
    }
    button.setAttribute('id', item.key);
    button.classList.add('keyboard__button');
    keyboard.appendChild(button);
  });
};

export const checkLanguage = () => {
  keysArray.forEach((item) => {
    const buttons = document.getElementById(item.key);
    if (currentLanguage.language === 'eng') {
      buttons.textContent = item.valueEng || item.value;
    } else {
      buttons.textContent = item.valueRu || item.value;
    }
  });
};
