(function() {
  var PX = 'px';

  MeteorChart.Component.extend('Title', {
    defaults: {
      height: function() {
        return this.fontSize(2);
      }
    },
    init: function() {
      this.text = MeteorChart.Dom.createElement('h2');
      this.content.appendChild(this.text);
    },
    _render: function() {
      var theme = this.chart.theme;

      this.text.style.fontSize = this.fontSize(2) + PX;
      this.text.style.fontFamily = theme.fontFamily;
      this.text.style.color = theme.primary;
      this.text.innerHTML = this.get('data');
    }
  });
})();