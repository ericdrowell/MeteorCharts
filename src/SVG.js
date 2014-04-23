(function() {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  MeteorChart.SVG = {
    createElement: function(tag) {
      return document.createElementNS(SVG_NS, tag);
    }
  };
})();