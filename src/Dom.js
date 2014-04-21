(function() {
  MeteorChart.Dom = {
    createElement: function(tag) {
      var el = document.createElement(tag);

      // inline resets
      el.style.padding = 0;
      el.style.margin = 0;
      return el;
    },
    getNumber: function(val) {
      return (val.replace('px', '')) * 1;
    },
    getElementPosition: function(el) {
      var rect = el.getBoundingClientRect ? el.getBoundingClientRect() : { top: 0, left: 0 };
      return {
        x: rect.left,
        y: rect.top
      }
    },
    setBorderRadius: function(el, radius) {
      el.style['borderRadius'] = radius;
    },
    getTextWidth: function(text) {
      var width = 0;
      this.dummy.innerHTML = text;
      width = this.dummy.clientWidth;
      this.dummy.innerHTML = '';

      return width;
    },
    getTextHeight: function(text) {
      var height = 0;
      this.dummy.innerHTML = text;
      height = this.dummy.clientHeight;
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
    }
  }
})();