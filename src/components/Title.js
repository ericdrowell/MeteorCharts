(function() {
  MeteorChart.Component.define('Title', {
    build: function() {
      var theme = this.chart.theme,
          font = theme.font;

      this.layer.enableHitGraph(false);

      this.layer.add(this._createTitle()); 
    },
    _createTitle: function() {
      var theme = this.chart.theme,
          font = theme.font;

      return new Kinetic.Text({
        text: this.data(),
        fontFamily: font.family,
        fontSize: font.size * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2,
        fill: theme.secondary
      });
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Title, 'height', function() {
    return this._createTitle().height();
  });

})();