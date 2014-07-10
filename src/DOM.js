(function() {
  var VENDORS = ['Webkit', 'Moz', 'MS', 'O'],
      VENDORS_LENGTH = VENDORS.length,
      PX = 'px';

  MeteorChart.DOM = {
    createElement: function(tag) {
      var el = document.createElement(tag);

      // inline resets
      el.style.padding = 0;
      el.style.margin = 0;
      this.addVendorStyle(el, 'boxSizing', 'border-box');

      return el;
    },
    getElementPosition: function(el) {
      var rect = el.getBoundingClientRect ? el.getBoundingClientRect() : { top: 0, left: 0 };
      return {
        x: rect.left,
        y: rect.top
      }
    },
    addVendorStyle: function(el, style, val) {
      var n;

      el.style[style] = val;
      for (n=0; n<VENDORS_LENGTH; n++) {
        el.style[VENDORS[n] + MeteorChart.Util.capitalize(style)] = val;
      }
    },
    getElementWidth: function(el) {
      return el.offsetWidth;
    },
    getElementHeight: function(el) {
      return el.offsetHeight;
    },
    getTextWidth: function(text) {
      var width = 0;
      this.dummy.innerHTML = text;
      width = this.dummy.offsetWidth;
      this.dummy.innerHTML = '';

      return width;
    },
    getTextHeight: function(text) {
      var height = 0;
      this.dummy.innerHTML = text;
      height = this.dummy.offsetHeight;
      this.dummy.innerHTML = '';

      return height;
    },
    hasClass: function(el, name) {
      return new RegExp(' ' + name + ' ').test(' ' + elem.className + ' ');
    },
    addClass: function(el, name) {
      if (!this.hasClass(el, name)) {
        elem.className += ' ' + name;
      }
    },
    removeClass: function(el, name) {
      var reg = new RegExp('(\\s|^)'+name+'(\\s|$)');
      el.className = el.className.replace(reg,' ');
    },
    setPosition: function(el, top, right, bottom, left) {
      el.style.position = 'absolute';
      
      el.style.top    = top    === null ? 'auto' : Math.round(top)    + 'px';
      el.style.right  = right  === null ? 'auto' : Math.round(right)  + 'px';
      el.style.bottom = bottom === null ? 'auto' : Math.round(bottom) + 'px';
      el.style.left   = left   === null ? 'auto' : Math.round(left)   + 'px';
    },
    pxToNum: function(str) {
      return parseInt(str.replace('px', ''));
    }
  }
})();