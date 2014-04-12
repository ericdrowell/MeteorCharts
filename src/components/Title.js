(function() {
  MeteorChart.Component.extend('Title', {
    init: function() {
      this.text = MeteorChart.Dom.createElement('h2');
      this.content.appendChild(this.text);
    },
    _render: function() {
      var theme = this.chart.theme,
          font = theme.font;

      this.text.style.fontSize = font.size * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
      this.text.style.fontFamily = font.family;
      this.text.style.color = theme.secondary;
      this.text.innerHTML = this.data();
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Title, 'height', function() {
    return this.chart.theme.font.size * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
  });

})();