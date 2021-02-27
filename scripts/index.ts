import ScreenChanger, { TPage } from './screen_changer';

function handleCheckboxClick (e: Event) {
  const target = e.target as HTMLInputElement;
  const element = document.getElementById('main-submit');

  if (target.checked) {
    element.removeAttribute('disabled');
  } else {
    element.setAttribute('disabled', 'disabled');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup acceptable pages
  const screensList: TPage[] = [
    'main',
    'scanner',
    'confirm',
    'result',
    'completed',
  ];
  const screenPagesObject: Record<string, HTMLElement> = {};

  screensList.forEach(screen => {
    // Get screen element
    const element = document.getElementById(screen);

    // If present - add screen to list
    if (element) {
      screenPagesObject[screen] = document.getElementById(screen);
    }
  });

  // Create changer instance
  const changer = new ScreenChanger(screenPagesObject);

  changer.init();

  window['changer'] = changer;

  // Setup handlers
  // EULA check click
  const eula = document.getElementById('eula');

  eula.addEventListener('change', handleCheckboxClick)
});
