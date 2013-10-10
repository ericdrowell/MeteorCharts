(function() {
var EMPTY_STRING = '',
    SPACE = ' ',
    MOUSEMOVE = 'mousemove',
    MOUSEOUT = 'mouseout',
    MOUSEOVER = 'mouseover',
    TOUCHMOVE = 'touchmove',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend',
    LINE_SPACING = 10,
    Y_LOCK_DURATION = 500;

  MeteorCharts.Tooltip = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.title = new Kinetic.Text({});
    this.content = new Kinetic.Text({});
    this.rect = new Kinetic.Rect();
    this.yTop = true;
    this.yLock = false;

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
          contentStr = chart.xAxis.formatter.long(config.x) + ', ' + chart.yAxis.formatter.long(config.y),
          padding = _view.get('tooltip', 'rect', 'padding'),
          strokeWidth = _view.get('tooltip', 'rect', 'strokeWidth'),
          chartWidth = _view.get('width'),
          width, height, x, y;

      title.setText(config.title);
      content.setText(contentStr);


      width = Math.max(title.getWidth(), content.getWidth()) + (padding * 2);
      height = title.getHeight() + content.getHeight() + LINE_SPACING + (padding);
      x = pos.x - (width / 2);
      
      // set x
      if (x < strokeWidth) {
        x = strokeWidth;
      }
      else if (x > chartWidth - width - strokeWidth) {
        x = chartWidth - width - strokeWidth;
      }

      group.setX(x);

      // set y
      if (pos.y < (chart.dataY + height + 10)) {
        this.setY(chart.dataY + height + 40);
      }
      else {
        this.setY(chart.dataY);
      }

      rect.setStroke(config.color);
      rect.setWidth(width);
      rect.setHeight(height);
    },
    setY: function(y) {
      var group = this.group;

      if (y !== group.getY() && !this.yLock) {
        group.setY(y);
        this.lockY();
      }
    },
    lockY: function() {
      var that = this;

      this.yLock = true;
      setTimeout(function() {
        that.yLock = false;
      }, Y_LOCK_DURATION);
    }
  };
})();