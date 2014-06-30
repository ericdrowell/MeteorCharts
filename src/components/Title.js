(function() {
  var PX = 'px';

  MeteorChart.Component.extend('Title', {
    defaults: {
      height: function() {
        return (this.chart.theme.fontSize * 2) + this.chart.get('style').padding / 2;
      }
    },
    init: function() {
      this.text = MeteorChart.DOM.createElement('h2');
      this.content.appendChild(this.text);
    },
    _render: function() {
      var theme = this.chart.theme;

      this.text.style.fontSize = (theme.fontSize * 2) + PX;
      this.text.style.fontFamily = theme.fontFamily;
      this.text.style.color = theme.primary;
      this.text.style.textAlign = 'center';
      this.text.innerHTML = this.get('data');
    }
  });
})();