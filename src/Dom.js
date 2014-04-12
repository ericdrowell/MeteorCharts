(function() {
  MeteorChart.Dom = {
    createElement: function(tag) {
      var el = document.createElement(tag);

      // inline resets
      el.style.padding = 0;
      el.style.margin = 0;
      return el;
    }
  }
})();