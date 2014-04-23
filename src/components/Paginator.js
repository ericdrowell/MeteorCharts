(function() {
  MeteorChart.Component.extend('Paginator', {
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
    return 100;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Circle, 'height', function() {
    return 20;
  });
})();