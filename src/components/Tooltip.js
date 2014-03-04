(function() {
  var PADDING = 10;
  
  MeteorChart.Component.define('Tooltip', {
    build: function() {
      var foreground = this.chart.theme().foreground,
          fonts = foreground.fonts,
          smallFont = fonts.small,
          mediumFont = fonts.medium;

      this.layer.enableHitGraph(false); 

      this.group = new Kinetic.Group();

      this.rect = new Kinetic.Rect({
        fill: foreground.primary,
        stroke: foreground.secondary,
        strokeWidth: 2
      });

      this.group.add(this.rect);

      this.title = new Kinetic.Text({
        x: PADDING,
        y: PADDING,
        fontFamily: mediumFont.fontFamily,
        fontSize: mediumFont.fontSize,
        fill: mediumFont.fill,
        stroke: mediumFont.stroke
      });

      this.group.add(this.title); 

      this.content = new Kinetic.Text({
        x: PADDING,
        // set y position to title height + spacing
        y: this.title.height() + (PADDING*2),
        lineHeight: 1.5,
        fontFamily: smallFont.fontFamily,
        fontSize: smallFont.fontSize,
        fill: smallFont.fill,
        stroke: smallFont.stroke
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
    },
    destroy: function() {

    }
  });
})();