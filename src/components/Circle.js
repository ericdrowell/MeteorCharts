(function() {
  MeteorChart.Component.extend('Circle', {
    init: function() {
      this.circle = MeteorChart.Dom.createElement('span');
      this.circle.style.display = 'inline-block';
      this.content.appendChild(this.text);
    },
    render: function() {
      var data = this.data(),
          radius = 20;

      this.circle.style.width = radius;
      this.circle.style.height = radius;
      this.circle.style.backgroundColor = 'red';
      MeteorChart.Dom.setBorderRadius(this.circle, radius);

    }
  });
})();