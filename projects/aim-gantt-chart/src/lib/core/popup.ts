import {RElement} from '@angular/core/src/render3/interfaces/renderer';
import {createHTMLFromString} from '../utils/svg-utils';

export class Popup {
  private readonly customHtml: any;
  private parent: any;
  private title: any;
  private pointer: any;

  constructor(parent, customHtml) {
    this.parent = parent;
    this.customHtml = customHtml;
    this.make();
  }

  make() {
    this.parent.innerHTML = `
            <div class="title"></div>
            <div class="pointer"></div>
        `;

    this.hide();

    this.title = this.parent.querySelector('.title');
    this.pointer = this.parent.querySelector('.pointer');
  }

  show(options) {
    if (!options.target_element) {
      throw new Error('target_element is required to show popup');
    }
    if (!options.position) {
      options.position = 'left';
    }
    const target_element = options.target_element;

    if (this.customHtml) {
      let html = this.customHtml(options.task);
      html += '<div class="pointer"></div>';
      this.parent.innerHTML = createHTMLFromString(html);
      this.pointer = this.parent.querySelector('.pointer');
    } else {
      // set data
      this.title.innerHTML = options.title;
    }

    // set position
    let positionMeta;
    if (target_element instanceof HTMLElement) {
      positionMeta = target_element.getBoundingClientRect();
    } else if (target_element instanceof SVGElement) {
      positionMeta = options.target_element.getBBox();
    }

    if (options.position === 'left') {
      this.parent.style.left =
        positionMeta.x + (positionMeta.width + 10) + 'px';
      this.parent.style.top = positionMeta.y + 'px';

      this.pointer.style.transform = 'rotateZ(90deg)';
      this.pointer.style.left = '-7px';
      this.pointer.style.top = '2px';
    }

    // show
    this.parent.style.opacity = 1;

  }

  hide() {
    this.parent.style.opacity = 0;
  }
}
