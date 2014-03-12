(function() {
  var PADDING = 10;
  
  MeteorChart.Component.define('Tooltip', {
    build: function() {
      var theme = this.chart.theme,
          font = theme.font;

      this.layer.enableHitGraph(false); 

      this.group = new Kinetic.Group();

      this.rect = new Kinetic.Rect({
        fill: theme.primary,
        stroke: MeteorChart.Util.hexToRgba(theme.secondary, 0.5),
        opacity: 0.85,
        cornerRadius: 3
      });

      this.group.add(this.rect);

      this.title = new Kinetic.Text({
        x: PADDING,
        y: PADDING,
        fontFamily: font.family,
        fontSize: font.size * MeteorChart.Constants.TYPOGRAPHIC_SCALE,
        fill: theme.secondary
      });

      this.group.add(this.title); 

      this.content = new Kinetic.Text({
        x: PADDING,
        // set y position to title height + spacing
        y: this.title.height() + (PADDING*2),
        lineHeight: 1.5,
        fontFamily: font.family,
        fontSize: font.size,
        fill: theme.secondary
      });

      this.group.add(this.content);

      this.update();

      this.layer.add(this.group);
    },
    _setSize: function() {
      this.rect.width(Math.max(this.title.width(), this.content.width()) + (PADDING*2));
      this.rect.height(this.title.height() + this.content.height() + (PADDING*3));

      this.group.offsetX(this.rect.width() / 2);
      this.group.offsetY(this.rect.height());
    },
    _update: function() {
      var data = this.data();

      if (data) {
        this.title.text(data.title || '');
        this.content.text(data.content || '');

        this._setSize();
      }
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'width', function() {
    return this.rect.width();
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'height', function() {
    return this.rect.height();
  });

})();