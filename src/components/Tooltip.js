(function() {
  var POINTER_SPACING = 15;
  
  MeteorChart.Component.define('Tooltip', {
    build: function() {
      var foreground = this.chart.theme.foreground,
          fonts = foreground.fonts,
          smallFont = fonts.small,
          mediumFont = fonts.medium,
          padding = 10,
          group, rect, title, content;

      this.layer.enableHitGraph(false); 

      group = new Kinetic.Group();

      rect = new Kinetic.Rect({
        fill: foreground.primary,
        stroke: foreground.secondary,
        strokeWidth: 2
      });

      group.add(rect);

      title = new Kinetic.Text({
        x: padding,
        y: padding,
        text: this.data().title,
        fontFamily: mediumFont.fontFamily,
        fontSize: mediumFont.fontSize,
        fill: mediumFont.fill,
        stroke: mediumFont.stroke
      });

      group.add(title); 

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

      group.add(content);

      rect.width(Math.max(title.width(), content.width()) + (padding*2));
      rect.height(title.height() + content.height() + (padding*3));

      group.offsetX(rect.width() / 2);
      group.offsetY(rect.height() + POINTER_SPACING);

      this.layer.add(group);
    },
    update: function() {

    },
    destroy: function() {

    }
  });
})();