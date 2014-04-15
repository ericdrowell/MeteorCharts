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
    }
  }
})();