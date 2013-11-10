(function() {
  var ADD_NODES_THRESHOLD = 15;

  MeteorCharts.Line = function(config) {
    // super
    MeteorCharts.Chart.call(this, config);
    this.__init(config);
  };

  MeteorCharts.Line.prototype = {
    __init: function() {
      // interaction components
      this.tooltip = new MeteorCharts.Tooltip(this);
      this.zoom = new MeteorCharts.Zoom(this);
      this.draw();
      this._addContent();
    },
    setBounds: function() {
      var that = this,
          autoMinMax = this.getAutoMinMax(),
          _view = this._view,
          viewMinX = _view.get('xAxis', 'min'),
          viewMinY = _view.get('yAxis', 'min'),
          viewMaxX = _view.get('xAxis', 'max'),
          viewMaxY = _view.get('yAxis', 'max');

        if (!this.minX && !this.minY && !this.maxX && !this.maxY) {
          this.minX = viewMinX === 'auto' ? autoMinMax.minX : viewMinX;
          this.minY = viewMinY === 'auto' ? autoMinMax.minY : viewMinY;
          this.maxX = viewMaxX === 'auto' ? autoMinMax.maxX : viewMaxX;
          this.maxY = viewMaxY === 'auto' ? autoMinMax.maxY : viewMaxY;
        }
    },
    _draw: function() {
      var that = this,
          _view = this._view,
          padding = _view.get('padding'),
          stage = this.stage,
          container = stage.getContainer();

      this.zoom.reset();
      this.tooltip.reset();

      this.bottomLayer.destroyChildren();
      this.dataLayer.destroyChildren();
      this.topLayer.destroyChildren();

      // TODO: width and height should be cached
      //stage.setSize(view.width, view.height);

      this.setBounds();

      container.style.backgroundColor = _view.get('backgroundColor');

      this.dataY = _view.get('title', 'text', 'fontSize') + _view.get('spacing') + padding;
      this.dataHeight = _view.get('height') - this.dataY - _view.get('xAxis', 'text', 'fontSize') - _view.get('spacing') - padding;
      this.scaleY = this.dataHeight / (this.maxY - this.minY);
      this.yAxis = new MeteorCharts.YAxis(this);
      this.dataWidth = _view.get('width') - this.dataX - padding;

      this.yAxis.lineGroup.getChildren().each(function(node) {
        node.setPoints([0, 0, that.dataWidth, 0]);
      });

      this.scaleX = this.dataWidth / (this.maxX - this.minX);
      this.xAxis = new MeteorCharts.XAxis(this);
      this.legend = new MeteorCharts.Legend(this);
      this.title = new MeteorCharts.Title(this);

      if (this.title.getWidth() + this.legend.getWidth() + (padding*2) + _view.get('spacing')> _view.get('width')) {
        this.legend.hide();
      }

      // add lines and labels
      this.addLines();

      // update interaction layer
      this.pointerMove();
      this.dataLayer.setClip([this.dataX, this.dataY, this.dataWidth, this.dataHeight]);
    },
    getAutoMinMax: function() {
      var model = this.model,
          lines = model.series,
          len = lines.length,
          firstPoint = lines[0].points[0],
          firstPointX = firstPoint.x,
          firstPointY = firstPoint.y,
          minX = firstPointX,
          minY = firstPointY,
          maxX = firstPointX,
          maxY = firstPointY,
          n, i, pointsLen, point, pointX, pointY, line, points;

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
      };
    },
    _getNearestPoint: function(pos) {
      var _view = this._view,
          model = this.model,
          lines = model.series,
          minX = this.minX,
          maxX = this.maxX,
          minY = this.minY,
          maxY = this.maxY,
          dataPoint = this.chartToData(pos.x, pos.y),
          dataX = dataPoint.x,
          dataY = dataPoint.y,
          nearestPoints = [],
          n, line, points, nearestPoint, i, point, finalPoint, pointX, pointY, diff, smallestDiff;


      for (n=0; n<lines.length; n++) {
        smallestDiff = Infinity;
        line = lines[n];
        points = line.points;
        nearestPoint = {
          color: _view.getSeriesStyle(n).stroke,
          title: line.title
        };
        for (i=0; i<points.length; i++) {
          point = points[i];
          pointX = point.x;
          pointY = point.y;
          diff = Math.abs(dataX - pointX);

          if (pointX >= minX && pointX <= maxX 
            && pointY >= minY && pointY <=maxY
            && diff < smallestDiff) { 
           
            smallestDiff = diff;
            nearestPoint.x = pointX;
            nearestPoint.y = pointY;
          }
        }

        if (nearestPoint.x !== undefined && nearestPoint.y !== undefined) {
          nearestPoints.push(nearestPoint);
        }
      }

      finalPoint = nearestPoints[0];

      smallestDiff = Infinity;

      for (n=0; n<nearestPoints.length; n++) {
        point = nearestPoints[n];
        diff = Math.abs(dataY - point.y);

        //if (Math.max(idealY, point.y) - Math.min(idealY, point.y) < Math.max(idealY, finalPoint.y) - Math.min(idealY, finalPoint.y)) {
        if (diff < smallestDiff) {
          smallestDiff = diff;
          finalPoint = point;
        }
      }

      return finalPoint;
    },
    pointerMove: function() {
      var pos = this.stage.getPointerPosition(),
          nearestPoint;

      if (pos) {
        nearestPoint = this._getNearestPoint(pos);

        if (nearestPoint) {
          this.tooltip.render(nearestPoint);
          this.tooltip.group.show();
        }
        else {
          this.tooltip.group.hide();
        }
      }
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
    dataToChartPoints: function(points) {
      var arr = [],
          len = points.length,
          n, point;

      for (n=0; n<len; n++) {
        point = points[n];

        arr.push(this.dataToChart(point.x, point.y));
      }

      return arr;
    },
    chartToData: function(x, y) {
      return {
        x: ((x - this.dataX) / this.scaleX) + this.minX,
        y: this.minY - ((y - this.dataHeight - this.dataY) / this.scaleY)
      };
    },
    addLine: function(points, style, addNodes) {
      var lineObj = new Kinetic.Line(MeteorCharts.Util.merge(
        style,
        {
          points: points,
          listening: false
        }));
      this.dataLayer.add(lineObj);

      if (addNodes) {
        this.addNodes(points, style);
      }
    },
    addNodes: function(points, style) {
      var _view = this._view,
          len = points.length,
          dataLayer = this.dataLayer,
          n, point;

      for (n=0; n<len; n++) {
        point = points[n];
        dataLayer.add(new Kinetic.Circle({
          x: point.x,
          y: point.y,
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
          start, end, i, point;

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
        lines = model.series,
        len = lines.length,
        style, 
        n, 
        line, 
        points, 
        addNodes, 
        startEnd, 
        start, 
        end, 
        chartRange,
        newPoints;

      for (n=0; n<len; n++) {
        line = lines[n];
        points = line.points;
        style = this._view.getSeriesStyle(n);
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
          this.addLine(this.dataToChartPoints(newPoints), style, addNodes);
        }
      }
    },
    _pan: function() {
      var pos = this.stage.getPointerPosition(),
          _view = this._view,
          diffX, diffY;

      if (this.lastPos) {
        diffX = (pos.x - this.lastPos.x) / this.scaleX;
        diffY = (pos.y - this.lastPos.y) / this.scaleY;
        this.minX = this.minX - diffX;
        this.minY = this.minY + diffY;
        this.maxX = this.maxX - diffX;
        this.maxY = this.maxY + diffY;
        this.batchDraw();
      }
    },
    _getContent: function() {
      var _view = this._view,
          model = this.model,
          series = model.series,
          len = series.length,
          n, line, points, firstPoint, lastPoint, change,
          xFormatter = this.xAxis.formatter,
          yFormatter = this.yAxis.formatter,
          content = [
            '<h2>MeteorCharts Line Chart Description</h2>',
            '<p>',
            'The title of the chart is "' + model.title + '". ',
            'The x axis begins at "' + xFormatter.short(this.minX) + '" and ends at "' + xFormatter.short(this.maxX) + '" from left to right. ',
            'The y axis begins at "' + yFormatter.short(this.minY) + '" and ends at "' + yFormatter.short(this.maxY) + '" from bottom to top. ',
            'There are ' + model.series.length + ' series lines. ',
          ];

      for (n=0; n<len; n++) {
        line = series[n];
        points = line.points;
        firstPoint = points[0];
        lastPoint = points[points.length - 1];
        change = lastPoint.y >= firstPoint.y ? 'rises' : 'falls';
        content.push('The line titled "' + series[n].title + '" begins at "' + yFormatter.short(firstPoint.y) + '" ');
        content.push('and ' + change + ' to "' + yFormatter.short(lastPoint.y) + '". ');
      }

      content.push('</p>');

      return content.join('');
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Line, MeteorCharts.Chart);
})();