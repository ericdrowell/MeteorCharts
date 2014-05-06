(function() {
  MeteorChart.Component.extend('Title', {
    defaults: {
      height: function() {
        return this.chart.theme.fontSize * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
      }
    },
    init: function() {
      this.text = MeteorChart.Dom.createElement('h2');
      this.content.appendChild(this.text);
    },
    _render: function() {
      var theme = this.chart.theme;

      this.text.style.fontSize = theme.fontSize * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
      this.text.style.fontFamily = theme.fontFamily;
      this.text.style.color = theme.primary;
      this.text.innerHTML = this.get('data');
    }
  });
})();