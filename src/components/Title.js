(function() {
  MeteorChart.Component.extend('Title', {
    init: function() {
      this.text = MeteorChart.Dom.createElement('h2');
      this.content.appendChild(this.text);
    },
    render: function() {
      var theme = this.chart.theme;

      this.text.style.fontSize = theme.fontSize * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
      this.text.style.fontFamily = theme.fontFamily;
      this.text.style.color = theme.primary;
      this.text.innerHTML = this.data();
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Title, 'height', function() {
    return this.chart.theme.fontSize * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2;
  });

})();