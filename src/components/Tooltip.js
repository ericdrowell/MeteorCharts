(function() {
  MeteorChart.Component.define('Tooltip', {
    build: function() {
      var foreground = this.chart.theme.foreground,
          fonts = foreground.fonts,
          smallFont = fonts.small,
          mediumFont = fonts.medium,
          padding = 10,
          rect, title, content;

      rect = new Kinetic.Rect({
        fill: foreground.primary,
        stroke: foreground.secondary,
        strokeWidth: 2
      });

      this.layer.add(rect);

      title = new Kinetic.Text({
        x: padding,
        y: padding,
        text: this.data().title,
        fontFamily: mediumFont.fontFamily,
        fontSize: mediumFont.fontSize,
        fill: mediumFont.fill,
        stroke: mediumFont.stroke
      });

      this.layer.add(title); 

      content = new Kinetic.Text({
        x: padding,
        // set y position to title height + spacing
        y: title.height() + (padding*2),
        lineHeight: 1.5,
        text: this.data().content,
        fontFamily: smallFont.fontFamily,
        fontSize: smallFont.fontSize,
        fill: smallFont.fill,
        stroke: smallFont.stroke
      });

      this.layer.add(content);

      rect.width(Math.max(title.width(), content.width()) + (padding*2));
      rect.height(title.height() + content.height() + (padding*3));
    },
    update: function() {
      this.layer.x(this.x());
      this.layer.y(this.y());
    },
    destroy: function() {

    }
  });
})();