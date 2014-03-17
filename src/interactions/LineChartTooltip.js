(function() {
  var POINTER_SPACING = 8,
      MIN_SQUARED_NEAREST_DISTANCE = Math.pow(50, 2);

  function squaredDistanceBetweenPoints(p1, p2) {
    var diffX = p2.x - p1.x,
        diffY = p2.y - p1.y;
    return (diffX*diffX) + (diffY*diffY);
  }

  MeteorChart.Interactions.LineChartTooltip = function(config) {
    this.tooltip = new MeteorChart.Components.Tooltip({
      id: 'tooltip',
      type: 'Tooltip',
      visible: false
    });

    this.chart = config.chart;
    this.line = config.line;

    this.chart.add(this.tooltip);
    this._bind();
  };

  MeteorChart.Interactions.LineChartTooltip.prototype = {
    pointBounded: function(point) {
      var line = this.line,
          tooltip = this.tooltip,
          retX = point.x,
          retY = point.y;

      if (retX + (tooltip.width() / 2) > line.chart.width()) {
        retX = line.chart.width() - (tooltip.width() / 2);
      }

      if (retX - (tooltip.width() / 2) < 0) {
        retX = (tooltip.width() / 2);
      }

      if (retY - tooltip.height() - POINTER_SPACING < 0) {
        retY = tooltip.height() + POINTER_SPACING;
      }
      return {
        x: retX,
        y: retY
      };
    },
    dataToChart: function(pos) {
      var line = this.line;
      return {
        x: (pos.x - line.minX) * line.scaleX + line.x(),
        y: line.height() - ((pos.y - line.minY) * line.scaleY) + line.y()
      }; 
    },
    chartToData: function(pos) {
      var line = this.line;

      return {
        x: ((pos.x - line.x()) / line.scaleX) + line.minX,
        y: line.minY - ((pos.y - line.y() - line.height()) / line.scaleY)
      };
    },
    getNearestPoint: function(pos) {
      var line = this.line,
          dataPos = this.chartToData(pos),
          data = line.data(),
          series = data.series,
          len = series.length,
          shortestDistance = Infinity,
          nearestPoint = null,
          n, i, ser, points, point, pointsLen, title, chartDistance;
   
      for (n=0; n<len; n++) {
        ser = series[n];
        points = ser.points;
        title = ser.title;
        pointsLen = points.length;


        for (i=0; i<pointsLen; i+=2) {
          point = {
            x: points[i], 
            y: points[i+1]
          };

          chartDistance = squaredDistanceBetweenPoints(pos, this.dataToChart(point));
          if (chartDistance < MIN_SQUARED_NEAREST_DISTANCE && chartDistance < shortestDistance) {
            nearestPoint = point;
            nearestPoint.title = title;
            shortestDistance = chartDistance;
          }
        }
      }

      return nearestPoint;
    },
    _bind: function() {
      var that = this,
          chart = this.chart,
          stage = chart.stage,
          line = this.line,
          tooltip = this.tooltip;

      stage.on('contentMouseover contentMousemove', MeteorChart.Util._throttle(function() {
        var pos = stage.getPointerPosition();
        if (pos) {
          nearestPoint = that.getNearestPoint(pos);

          if (nearestPoint) {

            if (tooltip.opacityTween) {
              tooltip.opacityTween.destroy();
              delete tooltip.opacityTween;
            }

            nearestPointChart = that.dataToChart(nearestPoint);
            nearestPointBounded = that.pointBounded(nearestPointChart);

            tooltip.visible(true);
            tooltip.x(nearestPointBounded.x);
            tooltip.y(nearestPointBounded.y - POINTER_SPACING);

            tooltip.data({
              title: nearestPoint.title,
              content: line.formatterX.long(nearestPoint.x) + ', ' + line.formatterY.long(nearestPoint.y)
            });


            tooltip.update();
            tooltip.batchDraw();   
          }
          else {
            if (tooltip.visible()) {
              tooltip.opacityTween = new Kinetic.Tween({
                node: tooltip.layer,
                opacity: 0,
                easing: Kinetic.Easings.EaseInOut,
                duration: 0.3
              });

              tooltip.visible(false);
              tooltip.update();
              tooltip.batchDraw(); 
            }  
          }
        }
      }, 100));

      stage.on('contentMouseout', function() {
        if (tooltip.opacityTween) {
          tooltip.opacityTween.destroy();
          delete tooltip.opacityTween;
        }
            
        tooltip.opacityTween = new Kinetic.Tween({
          node: tooltip.layer,
          opacity: 0,
          easing: Kinetic.Easings.EaseInOut,
          duration: 0.3
        });

        tooltip.visible(false);
        tooltip.update();
        tooltip.batchDraw();
      });
    }
  };
})();