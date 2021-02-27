/**
 * Global scope declarations
 */

export type TPage = 'main'
| 'scanner'
| 'confirm'
| 'result'
| 'completed';

export default class ScreenChanger {
  private pages: Record<TPage, HTMLElement>;
  public current: TPage;
  public nextPage: TPage;

  constructor(
    pages: Record<TPage, HTMLElement>,
    current: TPage = 'main',
  ) {
    this.pages = pages;
    this.current = current;
  }

  getCurrentClasses = () => {
    return this.pages[this.current];
  }

  init = () => {
    const element = this.pages[this.current];

    element.classList.remove('d-none');
    element.classList.add('shown');
  }

  initPage = (page: TPage) => {
    switch (page) {
      case 'scanner': {
        const scannerScreen = this.pages.scanner;
        const components = scannerScreen.getElementsByTagName('identityfront-scanner');

        if (components.length) {
          break;
        }

        const newComponent = document.createElement('identityfront-scanner');

        newComponent['evidences'] = 'selfie';
        scannerScreen.insertAdjacentElement("afterbegin", newComponent);

        const checkbox = document.getElementById('eula') as HTMLInputElement;

        if (checkbox) {
          checkbox.checked = false;
        }

        break;
      }

      case 'confirm': {
        const scannerScreen = this.pages.scanner;
        const components = scannerScreen.getElementsByTagName('identityfront-scanner');

        while (components.length) {
          scannerScreen.removeChild(components[0]);
        }

        break;
      }
    }
  }

  hadleScreenChange (page: TPage, target: HTMLDivElement) {
    const nextPage = this.pages[page];

    target.classList.add('d-none');
    target.classList.remove('shown');
    window.setTimeout(() => {
      this.initPage(page);
    }, 0);

    nextPage.classList.remove('d-none');
    window.setTimeout(() => {
      nextPage.classList.add('shown')
    }, 0);

    this.current = page;
  }

  screenChangeListener = (page: TPage, e: Event) => {
    const currentPage = this.pages[this.current];
    const target = e.target as HTMLDivElement;

    if (target.classList.contains('screen')) {
      this.hadleScreenChange(page, target);
    } else {
      currentPage.addEventListener('transitionend', this.screenChangeListener.bind(this, page), { once: true })
    }
  }

  changeStep = (page: TPage) => {
    const currentPage = this.pages[this.current];

    // Hide current
    currentPage.addEventListener('transitionend', this.screenChangeListener.bind(this, page), { once: true })

    // Start event
    currentPage.classList.remove('shown');
  }
}
