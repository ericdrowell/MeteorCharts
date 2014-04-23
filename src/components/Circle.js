(function() {
  MeteorChart.Component.extend('Circle', {
    init: function() {
      this.svg = MeteorChart.SVG.createElement('svg');
      this.circle = MeteorChart.SVG.createElement('circle');

      this.svg.appendChild(this.circle);
      this.content.appendChild(this.svg);
    },
    render: function() {
      var data = this.data(),
          style = this.style(),
          strokeWidth, radius;

      if (data) {
        radius = style.radius;
        strokeWidth = style.strokeWidth;

        this.svg.setAttribute('width', (radius * 2) + strokeWidth);
        this.svg.setAttribute('height', (radius * 2) + strokeWidth);

        this.circle.setAttribute('id','mycircle');
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
    var data = this.data();
    if (data) {
      return (data.radius * 2) + data.strokeWidth;
    }
    else {
      return 0;
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Circle, 'height', function() {
    var data = this.data();
    if (data) {
      return (data.radius * 2) + data.strokeWidth;
    }
    else {
      return 0;
    }
  });
})();