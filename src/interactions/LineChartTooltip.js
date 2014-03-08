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

  MeteorChart.Interactions.LineChartTooltip = {
    init: function(chart) {
      var stage = chart.stage,
          tooltip, line = chart.components.line,
          nearestPoint, nearestPointData;

      tooltip = new MeteorChart.Components.Tooltip({
        id: 'tooltip',
        type: 'Tooltip',
        visible: false
      });

      chart.add(tooltip);

      
   
      stage.on('contentMouseover contentMousemove', function() {
        var pos = stage.getPointerPosition();

        if (pos) {
          nearestPoint = getNearestPoint(pos, line);

          if (nearestPoint) {

            if (tooltip.opacityTween) {
              tooltip.opacityTween.destroy();
              delete tooltip.opacityTween;
            }

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
      });

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