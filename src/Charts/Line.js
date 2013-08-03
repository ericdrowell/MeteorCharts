(function() {
  var MOUSEDOWN = 'mousedown',
      MOUSEUP = 'mouseup',
      MOUSEMOVE = 'mousemove',
      // pixels per node
      ADD_NODES_THRESHOLD = 15;

  MeteorCharts.Line = function(config) {
    // super
    MeteorCharts.Chart.call(this, config);
    this.__init(config);
  };

  MeteorCharts.Line.prototype = {
    __init: function(config) {
      var that = this;
      // NOTE: when Kinetic introduces new clip bounding box, update this
      this.dataLayer.setClipFunc(function(canvas) {
          var context = canvas.getContext();
          context.rect(that.dataX, that.dataY, that.dataWidth, that.dataHeight);
      });

      // interaction components
      this.zoom = new MeteorCharts.Zoom(this);
      this.tooltip = new MeteorCharts.Tooltip(this);

      this.draw();
    },
    _draw: function() {
      var autoMinMax = this.getAutoMinMax(),
          view = this.view,
          _view = this._view,
          xAxisView = view.xAxis,
          yAxisView = view.yAxis,
          viewMinX = _view.get('xAxis', 'min'),
          viewMinY = _view.get('yAxis', 'min'),
          viewMaxX = _view.get('xAxis', 'max'),
          viewMaxY = _view.get('yAxis', 'max'),
          minX = this.minX = viewMinX === 'auto' ? autoMinMax.minX : viewMinX,
          minY = this.minY = viewMinY === 'auto' ? autoMinMax.minY : viewMinY,
          maxX = this.maxX = viewMaxX === 'auto' ? autoMinMax.maxX : viewMaxX,
          maxY = this.maxY = viewMaxY === 'auto' ? autoMinMax.maxY : viewMaxY,
          dataBottomGroup = this.dataBottomGroup = new Kinetic.Group(),
          dataTopGroup = this.dataTopGroup = new Kinetic.Group(),
          stage = this.stage,
          container = stage.getContainer();

      this.zoom.style();
      this.tooltip.style();

      this.bottomLayer.destroyChildren();
      this.dataLayer.destroyChildren();
      this.topLayer.destroyChildren();

      // TODO: width and height should be cached
      //stage.setSize(view.width, view.height);

      container.style.backgroundColor = _view.get('backgroundColor');

      this.dataLayer.add(dataBottomGroup).add(dataTopGroup);

      this.dataY = 40;
      this.dataHeight = _view.get('height') - this.dataY - _view.get('text', 'fontSize') - 10;
      this.scaleY = this.dataHeight / (maxY - minY);
      this.yAxis = new MeteorCharts.YAxis(this);
      this.dataWidth = _view.get('width') - this.dataX;
      this.scaleX = this.dataWidth / (maxX - minX);
      this.xAxis = new MeteorCharts.XAxis(this);

      this.legend = new MeteorCharts.Legend(this);
      this.title = new MeteorCharts.Title(this);

      // transform data layer
      this.dataBottomGroup.setY(this.dataHeight + this.dataY + (this.minY * this.scaleY));
      this.dataBottomGroup.setX(this.dataX);
      this.dataBottomGroup.setScale(this.scaleX, -1 * this.scaleY);

      // add lines and labels
      this.addLines();

      // update interaction layer
      this.pointerMove();
    },
    getAutoMinMax: function() {
      var model = this.model,
          view = this.view,
          lines = model.lines,
          len = lines.length,
          firstPoint = lines[0].points[0],
          firstPointX = firstPoint.x,
          firstPointY = firstPoint.y,
          minX = firstPointX,
          minY = firstPointY,
          maxX = firstPointX,
          maxY = firstPointY,
          n, i, pointsLen, point, pointX, pointY;

      for (n=0; n<len; n++) {
        line = lines[n];
        points = line.points;
        pointsLen = points.length;

        for (i=0; i<pointsLen; i++) {
          point = points[i];
          pointX = point.x;
          pointY = point.y;
          minX = Math.min(minX, pointX);
          minY = Math.min(minY, pointY);
          maxX = Math.max(maxX, pointX);
          maxY = Math.max(maxY, pointY);
        }
      }

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      }
    },
    pointerMove: function() {
      var pos = this.stage.getPointerPosition();

      if (!pos) {
        return false;
      }

      var view = this.view,
          _view = this._view,
          width = _view.get('width'),
          model = this.model,
          lines = model.lines,
          minX = this.minX,
          maxX = this.maxX,
          minY = this.minY,
          maxY = this.maxY,
          rangeX = maxX - minX,
          rangeY = maxY - minY,
          dataX = this.dataX,
          dataY = this.dataY,
          dataHeight = this.dataHeight,
          scaleX = this.scaleX,
          scaleY = this.scaleY,
          height = _view.get('height');


      var normalizedX = (pos.x - dataX) / this.dataWidth;
      var normalizedY = (pos.y - dataY) / this.dataHeight;
      var idealX = (rangeX * normalizedX) + minX;
      var idealY = maxY - (rangeY * normalizedY);
      var nearestPoints = [];

      for (var n=0; n<lines.length; n++) {
        var line = lines[n];
        var points = line.points;
        var nearestPoint = {
          x: points[0].x,
          y: points[0].y,
          color: _view.getDataStyle(n).stroke
        };
        for (var i=0; i<points.length; i++) {
          var point = points[i];
          if (Math.max(idealX, point.x) - Math.min(idealX, point.x) < Math.max(idealX, nearestPoint.x) - Math.min(idealX, nearestPoint.x)) {
            nearestPoint.x = point.x;
            nearestPoint.y = point.y;
          }
        }

        nearestPoints.push(nearestPoint);
      }

      var finalPoint = nearestPoints[0];

      for (var n=1; n<nearestPoints.length; n++) {
        var point = nearestPoints[n];
        if (Math.max(idealY, point.y) - Math.min(idealY, point.y) < Math.max(idealY, finalPoint.y) - Math.min(idealY, finalPoint.y)) {
          finalPoint = point;
        }
      }

      var tooltipPos = this.dataToChart(finalPoint.x, finalPoint.y);
      var str = this.xAxis.units.formatShort(finalPoint.x) + ', ' + this.yAxis.units.formatShort(finalPoint.y)

      this.tooltip.group.setPosition(tooltipPos);
      this.tooltip.node.setFill(finalPoint.color);
      this.tooltip.text.setText(str);

    },
    dataToChartX: function(x) {
      return (x-this.minX) * this.scaleX + this.dataX;
    },
    dataToChartY: function(y) {
      return this.dataHeight - ((y - this.minY) * this.scaleY) + this.dataY;
    },
    dataToChart: function(x, y) {
      return {
        x: this.dataToChartX(x),
        y: this.dataToChartY(y)
      };
    },
    chartToData: function(x, y) {
      return {
        x: ((x - this.dataX) / this.scaleX) + this.minX,
        y: this.minY - ((y - this.dataHeight - this.dataY) / this.scaleY)
      };
    },
    addLine: function(newPoints, style, addNode) {
      var lineObj = new Kinetic.Line(MeteorCharts.Util.merge(
        // defaults
        {
          strokeWidth: 2,
          lineJoin: 'round'
        },
        style,
        {
          points: newPoints,
          strokeScaleEnabled: false,
          offsetX: this.minX,
          listening: false
        }));
      this.dataBottomGroup.add(lineObj);

      if (addNode) {
        this.addNodes(newPoints, style);
      }
    },
    addNodes: function(points, style) {
      var _view = this._view,
          len = points.length,
          dataTopGroup = this.dataTopGroup,
          n, point, chartPoint;

      for (n=0; n<len; n++) {
        point = points[n];
        chartPoint = this.dataToChart(point.x, point.y);
        dataTopGroup.add(new Kinetic.Circle({
          x: chartPoint.x,
          y: chartPoint.y,
          radius: 5,
          stroke: _view.get('backgroundColor'),
          strokeWidth: 3,
          fill: style.stroke,
          listening: false
        }));
      }
    },
    getStartEnd: function(points) {
      var minX = this.minX,
          maxX = this.maxX,
          len = points.length,
          start, end, i;

      for (i=0; i<len; i++) {
        point = points[i];
        if (start === undefined && point.x >= minX) {
          start = i === 0 ? 0 : i -1;
        }
        if (end === undefined && point.x >= maxX) {
          end = i;
          break;
        }
      }

      if (end === undefined) {
        end = len-1;
      }

      return {
        start: start,
        end: end
      };
    },
    addLines: function() {
      var model = this.model,
        lines = model.lines,
        len = lines.length,
        minX = this.minX,
        maxX = this.maxX,
        addNodesThreshold, style, backgroundColor, n, line, lineObj, points, pointsLen, point, addNodes, startEnd, start, end, chartRange;

      for (n=0; n<len; n++) {
        line = lines[n];
        points = line.points;
        style = this._view.getDataStyle(n);
        newPoints = [];
        startEnd = this.getStartEnd(points);
        start = startEnd.start;
        end = startEnd.end;
        addNodes = false;

        if (start !== undefined && end !== undefined) {
          chartRange = this.dataToChartX(points[end].x) - this.dataToChartX(points[start].x);
          addNodes = chartRange / (end - start) > ADD_NODES_THRESHOLD;
        }

        newPoints = points.slice(start, end + 1);

        if (newPoints.length > 1) {
          this.addLine(newPoints, style, addNodes);
        }
      }
    },
    _pan: function() {
      var pos = this.stage.getPointerPosition(),
          view = this.view,
          diffX, diffY, minX, maxX, minY, maxY;

      if (this.lastPos) {
        diffX = (pos.x - this.lastPos.x) / this.scaleX;
        diffY = (pos.y - this.lastPos.y) / this.scaleY;

        view.xAxis.min = this.minX - diffX;
        view.xAxis.max = this.maxX - diffX;
        view.yAxis.min = this.minY + diffY;
        view.yAxis.max = this.maxY + diffY;
        this.batchDraw();
      }
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Line, MeteorCharts.Chart);
})();