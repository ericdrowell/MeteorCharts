(function() {
  var SQRT = Math.sqrt,
      POINTER_SPACING = 8,
      MIN_NEAREST_DISTANCE = 50;

  function chartToData(pos, line) {
    return {
      x: ((pos.x - line.x()) / line.scaleX) + line.minX,
      y: line.minY - ((pos.y - line.y() - line.height()) / line.scaleY)
    };
  }

  function dataToChart(pos, line) {
    return {
      x: (pos.x - line.minX) * line.scaleX + line.x(),
      y: line.height() - ((pos.y - line.minY) * line.scaleY) + line.y()
    }; 
  }

  function distanceBetweenPoints(p1, p2) {
    var diffX = p2.x - p1.x,
        diffY = p2.y - p1.y;
    return SQRT((diffX*diffX) + (diffY*diffY));
  }

  function pointBounded(point, line, tooltip) {
    var retX = point.x,
        retY = point.y;

    if (retX + (tooltip.width() / 2) > line.chart.width()) {
      retX = line.chart.width() - (tooltip.width() / 2);
    }

    if (retY - tooltip.height() - POINTER_SPACING < 0) {
      retY = tooltip.height() + POINTER_SPACING;
    }
    return {
      x: retX,
      y: retY
    };
  }

  function getNearestPoint(pos, line) {
    var dataPos = chartToData(pos, line),
        data = line.data(),
        series = data.series,
        len = series.length,
        shortestDistance = Infinity,
        nearestPoint = null,
        n, i, ser, points, point, distance, pointsLen, title, chartDistance;

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

        
        chartDistance = distanceBetweenPoints(pos, dataToChart(point, line));
        if (chartDistance < MIN_NEAREST_DISTANCE) {
          distance = distanceBetweenPoints(dataPos, point);

          if (distance < shortestDistance) {
            nearestPoint = point;
            nearestPoint.title = title;
            shortestDistance = distance;
          }
        }
      }
    }

    return nearestPoint;
  }

  MeteorChart.Layouts.InteractiveLineChart = {
    init: function(chart) {
      var stage = chart.stage,
          tooltip = chart.components.tooltip,
          line = chart.components.line,
          nearestPoint, nearestPointData;

      stage.on('contentMouseover contentMousemove', function() {
        var pos = stage.getPointerPosition();

        if (pos) {
          nearestPoint = getNearestPoint(pos, line);

          if (nearestPoint) {
            nearestPointChart = dataToChart(nearestPoint, line);
            nearestPointBounded = pointBounded(nearestPointChart, line, tooltip);

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
            tooltip.visible(false);
            tooltip.update();
            tooltip.batchDraw();   
          }
        }
      });

      stage.on('contentMouseout', function() {
        tooltip.visible(false);
        tooltip.update();
        tooltip.batchDraw();
      });
    },
    initOrder: ['line', 'yAxis', 'xAxis', 'tooltip'],
    components: [
      {
        id: 'line',
        type: 'Line',
        x: function() {
          var chart = this.chart;
          return chart.components.yAxis.width() + (chart.padding() * 2);
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          var chart = this.chart;
          return chart.width() - chart.components.yAxis.width() - (chart.padding() * 3);
        },
        height: function() {
          var chart = this.chart,
              components = chart.components;

          return chart.height() - (chart.padding() * 3) - components.xAxis.height();
        }
      },
      {
        id: 'yAxis',
        type: 'Axis',
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.line.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.line.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            min: viewport.minY,
            max: viewport.maxY,
            unit: data.unit.y
          }
        },
        options: {
          orientation: 'vertical'
        }
      },
      {
        id: 'xAxis',
        type: 'Axis',
        x: function() {
          // bind axis x position to line x position
          return this.chart.components.line.x();
        },
        y: function() {
          var line = this.chart.components.line;

          return line.y() + line.height() +   this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.line.width();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.line.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            min: viewport.minX,
            max: viewport.maxX,
            unit: data.unit.x
          }
        },
        options: {
          maxIncrements: 5
        }
      },
      {
        id: 'tooltip',
        type: 'Tooltip'
      }
    ]
  };
})();