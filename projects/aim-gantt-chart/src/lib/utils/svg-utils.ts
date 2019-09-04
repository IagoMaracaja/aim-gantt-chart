export function createSVG(tag, attrs) {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
  // tslint:disable-next-line:forin
  for (const attrib in attrs) {
    if (attrib === 'append_to') {
      const parent = attrs.append_to;
      if (attrs.class === 'divisor') {
      }
      if (parent) {
        parent.appendChild(elem);
      }
    } else if (attrib === 'innerHTML') {
      // elem.innerHTML = attrs.innerHTML;
      if (attrs.innerHTML) {
        elem.appendChild(createFilterFromHTML(attrs.innerHTML));
      }
    } else {
      elem.setAttribute(attrib, attrs[attrib]);
    }
  }
  return elem;
}

export function createFilterFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.toString().trim();
  return div.firstChild;
}

export function animateSVG(svgElement, attr, from, to) {
  const animatedSvgElement = getAnimationElement(svgElement, attr, from, to);

  if (animatedSvgElement === svgElement) {
    // triggered 2nd time programmatically
    // trigger artificial click event
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    // event.eventName = 'click';
    animatedSvgElement.dispatchEvent(event);
  }
}

function getAnimationElement(
  svgElement,
  attr,
  from,
  to,
  dur = '1.0s',
  begin = '0.1s'
) {
  const animEl = svgElement.querySelector('animate');
  if (animEl) {
    attr(animEl, {
      attributeName: attr,
      from,
      to,
      dur,
      begin: 'click + ' + begin // artificial click
    });
    return svgElement;
  }

  const animateElement = createSVG('animate', {
    attributeName: attr,
    from,
    to,
    dur,
    begin,
    calcMode: 'spline',
    values: from + ';' + to,
    keyTimes: '0; 1',
    keySplines: cubic_bezier('ease-out')
  });
  svgElement.appendChild(animateElement);

  return svgElement;
}

function cubic_bezier(name) {
  return {
    ease: '.25 .1 .25 1',
    linear: '0 0 1 1',
    'ease-in': '.42 0 1 1',
    'ease-out': '0 0 .58 1',
    'ease-in-out': '.42 0 .58 1'
  }[name];
}

export function attr(element, attribute, value?) {
  /*if (!value && typeof attribute === 'string') {
    return element.getAttribute(attribute);
  }*/

  if ((typeof attribute === 'undefined' ? 'undefined' : typeof (attribute)) === 'object') {
    // tslint:disable-next-line:forin
    for (const key in attribute) {
      attr(element, key, attribute[key]);
    }
    return;
  }

  element.setAttribute(attribute, value);
}

export function on(element, event, selector, callback?) {
  if (!callback) {
    callback = selector;
    bind(element, event, callback);
  } else {
    delegate(element, event, selector, callback);
  }
}

export function bind(element, event, callback) {
  // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
  event.split(/\s+/).forEach(function(event) {
    element.addEventListener(event, callback);
  });
}

export function delegate(element, event, selector, callback) {
  element.addEventListener(event, function(e) {
    const delegatedTarget = e.target.closest(selector);
    if (delegatedTarget) {
      e.delegatedTarget = delegatedTarget;
      callback.call(this, e, delegatedTarget);
    }
  });
}

