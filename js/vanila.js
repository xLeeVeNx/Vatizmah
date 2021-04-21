'use strict';

//Layout JS
const headerBurger   = document.querySelector('.header__burger');
const headerMenuList = document.querySelector('.header__menu-list');
const headerClose    = document.querySelector('.header__close');
const headerMenuBtn  = document.querySelector('.header__menu-btn')

const classActive = () => {
  headerMenuList.classList.toggle('header__menu-list--active');
  headerClose.classList.add('header__close--active');
  headerMenuBtn.classList.add('header__menu-btn--active');
  document.body.classList.add('body--active');
};

const deleteClass = () => {
  headerMenuList.classList.remove('header__menu-list--active');
  headerClose.classList.remove('header__close--active');
  headerMenuBtn.classList.remove('header__menu-btn--active');
  document.body.classList.remove('body--active');
};

headerBurger.addEventListener('click', classActive);
headerClose.addEventListener('click', deleteClass);

//Timer
const deadlineDate = '2021-04-23T06:02';

const getTimeRemaining = (date) => {
  const t = Date.parse(date) - new Date(),
    days = Math.floor(t / 1000 / 60 / 60 / 24),
    hours = Math.floor((t / 1000 / 60 / 60) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60);

  return {
    t,
    days,
    hours,
    minutes,
  };
};

const setTimer = (selector, date) => {
  const timer = document.querySelector(selector),
    days = timer.querySelector('.timer__days'),
    hours = timer.querySelector('.timer__hours'),
    minutes = timer.querySelector('.timer__minutes'),
    timerTic = setInterval(updateTimer, 1000);

  function updateTimer(data) {
    const t = getTimeRemaining(date);

    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);

    if (t.t <= 0) {
      clearInterval(timerTic);
    }
  }

  updateTimer();
};

function getZero(num) {
  if (num >= 0 && num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}

setTimer('.discount__timer', deadlineDate);
setTimer('.stock__timer', deadlineDate);

//Popup
const popupOpenBtn  = document.querySelectorAll('.popup-openBtn');
const popupCloseBtn = document.querySelectorAll('.popup-closeBtn');
const body          = document.querySelector('body');

let unlock = true;
const timeout = 500;

if (popupOpenBtn.length) {
  for (let index = 0; index < popupOpenBtn.length; index++) {
    const currentOpenBtn = popupOpenBtn[index];
    currentOpenBtn.addEventListener('click', () => {
      const popupName = currentOpenBtn.getAttribute('data-popup');
      const currentPopup = document.querySelector(`.${popupName}`);

      popupOpen(currentPopup);
    });
  }
}

if (popupCloseBtn.length) {
  for (let index = 0; index < popupCloseBtn.length; index++) {
    const currentCloseBtn = popupCloseBtn[index];

    currentCloseBtn.addEventListener('click', () => {
      popupClose(currentCloseBtn.closest('.popup'));
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup--active');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('popup--active');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__inner')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('popup--active');
    
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('scroll-hidden');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(() => {
    body.style.paddingRight = '0px';
    body.classList.remove('scroll-hidden');
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (elem) {
  if (elem.which === 27) {
    const popupActive = document.querySelector('.popup--active');
    popupClose(popupActive);
  }
});