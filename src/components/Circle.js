(function() {
  MeteorChart.Component.extend('Circle', {
    init: function() {
      this.svg = MeteorChart.Dom.createElement('svg');
      this.svg.style.display = 'inline-block';

      var svgNS = 'http://www.w3.org/2000/svg';

      this.svg = document.createElementNS(svgNS, 'svg');
      this.svg.setAttribute('xmlns', svgNS);
      this.circle = document.createElementNS(svgNS,'circle');

      this.svg.appendChild(this.circle);
      this.content.appendChild(this.svg);
    },
    render: function() {
      var data = this.data(),
          strokeWidth, radius;

      if (data) {
        radius = data.radius;
        strokeWidth = data.strokeWidth;

        this.svg.setAttribute('width', (radius * 2) + strokeWidth);
        this.svg.setAttribute('height', (radius * 2) + strokeWidth);

        this.circle.setAttribute('id','mycircle');
        this.circle.setAttribute('cx', radius + strokeWidth / 2);
        this.circle.setAttribute('cy', radius + strokeWidth / 2);
        this.circle.setAttribute('r', radius);
        this.circle.setAttribute('fill', data.fill);
        this.circle.setAttribute('stroke', data.stroke);
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