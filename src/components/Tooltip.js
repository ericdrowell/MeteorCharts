(function() {
var EMPTY_STRING = '',
    SPACE = ' ',
    MOUSEMOVE = 'mousemove',
    MOUSEOUT = 'mouseout',
    MOUSEOVER = 'mouseover',
    TOUCHMOVE = 'touchmove',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend',
    LINE_SPACING = 10;

  MeteorCharts.Tooltip = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.title = new Kinetic.Text({});
    this.content = new Kinetic.Text({});
    this.rect = new Kinetic.Rect();

    
    this.group.add(this.rect).add(this.title).add(this.content);
    chart.interactionLayer.add(this.group);
  };

  MeteorCharts.Tooltip.prototype = {
    reset: function() {
      var _view = this.chart._view,
          padding = _view.get('tooltip', 'rect', 'padding');

      this.title.setAttrs(MeteorCharts.Util.merge(
        _view.get('tooltip', 'title'),
        {
          text: '',
          x: padding,
          y: padding
        }
      ));

      this.content.setAttrs(MeteorCharts.Util.merge(
        _view.get('tooltip', 'content'),
        {
          text: '',
          y: this.title.getHeight() + LINE_SPACING,
          x: padding
        }
      ));

      this.rect.setAttrs(_view.get('tooltip', 'rect'));
    },
    render: function(config) {
      var chart = this.chart,
          _view = chart._view,
          group = this.group,
          rect = this.rect,
          title = this.title,
          content = this.content,
          pos = chart.dataToChart(config.x, config.y),
          contentStr = chart.xAxis.formatter.formatShort(config.x) + ', ' + chart.yAxis.formatter.formatShort(config.y),
          padding = _view.get('tooltip', 'rect', 'padding'),
          width;

      title.setText(config.title);
      content.setText(contentStr);

      width = Math.max(title.getWidth(), content.getWidth()) + (padding * 2);

      group.setPosition(pos.x, chart.dataY);
      group.setOffsetX(width / 2);
      rect.setStroke(config.color);
      rect.setWidth(width);
      rect.setHeight(title.getHeight() + content.getHeight() + LINE_SPACING + (padding));
    }
  };
})();