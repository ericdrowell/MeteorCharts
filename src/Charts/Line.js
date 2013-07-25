(function() {
  var MOUSEDOWN = 'mousedown',
      MOUSEUP = 'mouseup',
      MOUSEMOVE = 'mousemove',
      // pixels per node
      ADD_NODES_THRESHOLD = 15;

  Meteor.Line = function(config) {
    // super
    Meteor.Chart.call(this, config);
    this.__init(config);
  };

  Meteor.Line.prototype = {
    __init: function(config) {
      var that = this;
      // NOTE: when Kinetic introduces new clip bounding box, update this
      this.dataLayer.setClipFunc(function(canvas) {
          var context = canvas.getContext();
          context.rect(that.dataX, that.dataY, that.dataWidth, that.dataHeight);
      });

      // interaction components
      this.zoom = new Meteor.Zoom(this);
      this.tooltip = new Meteor.Tooltip(this);

      this.sync();
    },
    sync: function(batchDraw) {
      var autoMinMax = this.getAutoMinMax(),
          skin = this.skin,
          xAxisSkin = skin.xAxis,
          yAxisSkin = skin.yAxis,
          minX = this.minX = xAxisSkin.min === undefined || xAxisSkin.min === 'auto' ? autoMinMax.minX : xAxisSkin.min,
          minY = this.minY = yAxisSkin.min === undefined || yAxisSkin.min === 'auto' ? autoMinMax.minY : yAxisSkin.min,
          maxX = this.maxX = xAxisSkin.max === undefined || xAxisSkin.max === 'auto' ? autoMinMax.maxX : xAxisSkin.max,
          maxY = this.maxY = yAxisSkin.max === undefined || yAxisSkin.max === 'auto' ? autoMinMax.maxY : yAxisSkin.max,
          dataBottomGroup = this.dataBottomGroup = new Kinetic.Group(),
          dataTopGroup = this.dataTopGroup = new Kinetic.Group(),
          stage = this.stage,
          container = stage.getContainer();

      this.zoom.draw();

      this.bottomLayer.destroyChildren();
      this.dataLayer.destroyChildren();
      this.topLayer.destroyChildren();


      stage.setSize(skin.width, skin.height);

      container.style.backgroundColor = skin.background;

      this.dataLayer.add(dataBottomGroup).add(dataTopGroup);

      this.dataY = 40;
      this.dataHeight = skin.height - this.dataY- skin.text.fontSize - 10;
      this.scaleY = this.dataHeight / (maxY - minY);
      this.yAxis = new Meteor.YAxis(this);
      this.dataWidth = skin.width - this.dataX;
      this.scaleX = this.dataWidth / (maxX - minX);
      this.xAxis = new Meteor.XAxis(this);

      this.legend = new Meteor.Legend(this);
      this.title = new Meteor.Title(this);

      // transform data layer
      this.dataBottomGroup.setY(this.dataHeight + this.dataY + (this.minY * this.scaleY));
      this.dataBottomGroup.setX(this.dataX);
      this.dataBottomGroup.setScale(this.scaleX, -1 * this.scaleY);

      // add lines and labels
      this.addLines();

      // update interaction layer
      this.pointerMove();

      this.__bind();

      if (batchDraw) {
        this.bottomLayer.batchDraw();
        this.dataLayer.batchDraw();
        this.topLayer.batchDraw();
        this.interactionLayer.batchDraw();
      }
      else {
        this.stage.draw();
      }

      this.stage.fire('sync');
    },
    __bind: function() {

    },
    getDataStyle: function(n) {
      var data = this.skin.data,
          len = data.length;

      return data[n % len];
    },
    getAutoMinMax: function() {
      var model = this.model,
          skin = this.skin,
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

      var skin = this.skin,
          width = skin.width,
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
          height = skin.height;


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
          color: this.getDataStyle(n).stroke
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
      var lineObj = new Kinetic.Line(Meteor.Util.merge(
        // defaults
        {
          strokeWidth: 2,
          lineJoin: 'round'
        },
        style,
        {
          points: newPoints,
          strokeScaleEnabled: false,
          offsetX: this.minX
        }));
      this.dataBottomGroup.add(lineObj);

      if (addNode) {
        this.addNodes(newPoints, style);
      }
    },
    addNodes: function(points, style) {
      var skin = this.skin,
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
          stroke: skin.background,
          strokeWidth: 3,
          fill: style.stroke

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
        style = this.getDataStyle(n);
        newPoints = [];
        startEnd = this.getStartEnd(points);
        start = startEnd.start;
        end = startEnd.end;
        addNodes = false;

        if (start !== undefined && end !== undefined) {
          chartRange = this.dataToChartX(points[end].x) - this.dataToChartX(points[start].x);
          addNodes = chartRange / (end - start) > ADD_NODES_THRESHOLD;
        }

        for (var i=start; i<=end; i++) {
          point = points[i];
          newPoints.push({
            x: point.x,
            y: point.y
          });
        }

        if (newPoints.length > 1) {
          this.addLine(newPoints, style, addNodes);
        }
      }
    },
    _pan: function() {
      var pos = this.stage.getPointerPosition(),
          skin = this.skin,
          diffX, diffY, minX, maxX, minY, maxY;

      if (this.lastPos) {
        diffX = (pos.x - this.lastPos.x) / this.scaleX;
        diffY = (pos.y - this.lastPos.y) / this.scaleY;

        skin.xAxis.min = this.minX - diffX;
        skin.xAxis.max = this.maxX - diffX;
        skin.yAxis.min = this.minY + diffY;
        skin.yAxis.max = this.maxY + diffY;

        this.sync();
      }
    }
  };

  Meteor.Util.extend(Meteor.Line, Meteor.Chart);
})();