(function() {
  MeteorChart.Component.extend('Circle', {
    init: function() {
      this.svg = MeteorChart.SVG.createElement('svg');
      this.circle = MeteorChart.SVG.createElement('circle');

      this.svg.appendChild(this.circle);
      this.content.appendChild(this.svg);
    },
    _render: function() {
      var style = this.get('style'),
          strokeWidth, radius;

      if (style.fill || style.stroke) {
        radius = style.radius;
        strokeWidth = style.strokeWidth;

        this.svg.setAttribute('width', this.width());
        this.svg.setAttribute('height', this.height());

        this.circle.setAttribute('cx', radius + strokeWidth / 2);
        this.circle.setAttribute('cy', radius + strokeWidth / 2);
        this.circle.setAttribute('r', radius);
        this.circle.setAttribute('fill', style.fill);
        this.circle.setAttribute('stroke', style.stroke);
        this.circle.setAttribute('stroke-width', strokeWidth);
      }
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Circle, 'width', function() {
    var style = this.get('style');
    if (style) {
      return (style.radius * 2) + style.strokeWidth;
    }
    else {
      return 0;
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Circle, 'height', function() {
    var style = this.get('style');
    if (style) {
      return (style.radius * 2) + style.strokeWidth;
    }
    else {
      return 0;
    }
  });
})();