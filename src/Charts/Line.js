(function() {
  var EMPTY_STRING = '',
      SECONDS_IN_YEAR = 31536000,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60,
      SPACE = ' ',
      MOUSEMOVE = 'mousemove',
      MOUSEOUT = 'mouseout',
      MOUSEOVER = 'mouseover',
      TOUCHMOVE = 'touchmove',
      TOUCHSTART = 'touchstart',
      TOUCHEND = 'touchend',
      TEXT = 'Text',
      RECT = 'Rect',
      COMMA_SPACE = ', ',
      APPROX_NUMBER_OF_Y_LABELS = 5,
      MAX_NUMBER_OF_X_LABELS = 7,
      MAX_POINT_DIST = 10,
      GRANULARITY_TO_SECONDS = [
        SECONDS_IN_YEAR, 
        SECONDS_IN_MONTH, 
        SECONDS_IN_DAY, 
        SECONDS_IN_HOUR, 
        SECONDS_IN_MINUTE
      ],
      GRANULARITIES = {
        YEAR: 0,
        MONTH: 1,
        DAY: 2,
        HOUR: 3,
        MINUTE: 4,
        SECOND: 5 
      },
      minX, minY, maxX, maxY, scaleX, scaleY;
  
  Meteor.Line = function(config) {
    // super
    Meteor.Chart.call(this, config);
    this.init(config);
  };     
  
  Meteor.Line.prototype = {
    init: function(config) {
      var that = this;

      this.setMinMax();
      this.setGranularity();
      this.markers = [];
      this.tooltips = [];
      
      // transform model layer
      this.mainLayer.setY(this.layout.height + (minY * scaleY));
      this.mainLayer.setScale(scaleX, -1 * scaleY);
      
      // add lines and labels
      this.addLines();
      this.addYLabels();
      this.addXLabels();
      this.addSlider();
      this.stage.draw();
      this.bind();
      
      this.interactionAnim = new Kinetic.Animation(function() {
      }, this.interactionLayer);

      this.interactionShow = new Kinetic.Tween({
        node: that.interactionLayer,
        duration: 0.3,
        opacity: 1,
        easing: Kinetic.Easings.EaseInOut
      });

      /*
      this.interactionLayer.on('draw', function() {
        console.log('draw')
      })
      */
    },
    addSlider: function() {
      var layout = this.layout,
          stage = this.stage;
      
      this.slider = new Kinetic.Line({
        x: 0,
        y: 0,
        points: [0, 0, 0, layout.height],
        stroke: this.skin.slider,
        strokeWidth: 2,
        opacity: 0.8
      }); 
      
      this.interactionLayer.add(this.slider);
    },
    showInteractionLayer: function() {
      this.interactionShow.play();
      this.interactionLayer.setOpacity(1);
      this.interactionAnim.start();
    },
    hideInteractionLayer: function() {
      this.interactionShow.reverse();
      this.interactionAnim.stop();
    },
    bind: function() {
      var stage = this.stage,
          content = stage.getContent(),
          that = this;
      
      content.addEventListener(MOUSEMOVE, function() {
        that.updateInteractionLayer();
      }); 
      
      content.addEventListener(TOUCHMOVE, function() {
        that.updateInteractionLayer();
      }); 
      
      content.addEventListener(MOUSEOUT, function() {
        that.hideInteractionLayer();
      });   
      
      content.addEventListener(TOUCHEND, function() {
        that.hideInteractionLayer();
      }); 
      
      content.addEventListener(MOUSEOVER, function() {
        that.showInteractionLayer();
      });
      
      content.addEventListener(TOUCHSTART, function() {
        that.showInteractionLayer();
      });
    },
    updateInteractionLayer: function() {
      var stage = this.stage,
          layout = this.layout,
          stageWidth = stage.getWidth(),
          pos = stage.getPointerPosition(),
          height = layout.height,
          posX = pos.x,
          nearestPoints = this.getNearestPoints(posX),
          len = nearestPoints.length,
          tooltips = this.tooltips,
          tooltipsLen = tooltips.length,
          slider = this.slider,
          markers = this.markers,
          granularity = this.granularity,
          n, marker, point, pointX, pointY, text, markerX, markerY, rightX, tooltip;
          
      slider.setX(posX);
      
      // update markers
      for (n=0; n<len; n++) {
        point = nearestPoints[n];
        pointX = point.x;
        pointY = point.y;
        marker = markers[n];
        markerX = (pointX-minX) * scaleX;
        markerY = height - ((pointY - minY) * scaleY);
        tooltip = marker.tooltip;
        text = tooltip.getText();
        marker.setPosition(markerX, markerY);
        text.setText(this.getFormattedLongDate(new Date(pointX), granularity + 1) + COMMA_SPACE + this.getFormattedYLabel(pointY));

        rightX = markerX + tooltip.getWidth(); 

        if (rightX > stage.getWidth()) {
          tooltip.getTag().setPointerDirection('right');
          tooltip.setX(-5);
        }
        else {
          tooltip.getTag().setPointerDirection('left');
          tooltip.setX(5);
        }


      }
    },
    getNearestPoints: function(x) {
      var model = this.model,
          lines = model.lines,
          len = lines.length,
          nearestPoints = [],
          relX = x / scaleX,
          n, i, pointsLen, point, pointX, pointY, nearestPoint, minDist, dist;
          
      for (n=0; n<len; n++) {
        line = lines[n];
        points = line.points;
        pointsLen = points.length;
        minDist = maxX - minX;
        
        for (i=0; i<pointsLen; i++) {
          point = points[i];
          pointX = point.x - minX;
          pointY = point.y;
          dist = Math.abs(relX - pointX);
          
          if (dist < minDist) {
            nearestPoint = point; 
            nearestPoint.lineIndex = n;
            minDist = dist;
          }
        }

        nearestPoints.push(nearestPoint);

      }
      
      return nearestPoints;
    },
    getChartY: function(y) {
      var height = this.layout.height;
      
      return height + (minY - y) * scaleY;
    },
    addYLabels: function() {
      var range = maxY - minY,
          increment = Math.round((range / APPROX_NUMBER_OF_Y_LABELS) / 10) * 10,
          y = 0;

      // draw labels at 0 and above
      while(y <= maxY) {
        this.addYLabel(this.getFormattedYLabel(y), this.getChartY(y));
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y > minY) {
        this.addYLabel(this.getFormattedYLabel(y), this.getChartY(y));
        y-=increment; 
      }
    },
    setGranularity: function() {
      var range = (maxX - minX) / 1000,
          smallestIncrement = range / MAX_NUMBER_OF_X_LABELS,
          granularity = GRANULARITIES.SECOND;

      if (smallestIncrement > SECONDS_IN_MINUTE) {
        granularity = GRANULARITIES.MINUTE;
      }
      if (smallestIncrement > SECONDS_IN_HOUR) {
        granularity = GRANULARITIES.HOUR;
      }
      if (smallestIncrement > SECONDS_IN_DAY) {
        granularity = GRANULARITIES.DAY;
      }
      if (smallestIncrement > SECONDS_IN_MONTH) {
        granularity = GRANULARITIES.MONTH;
      }
      if (smallestIncrement > SECONDS_IN_YEAR) {
        granularity = GRANULARITIES.YEAR;
      }

      this.granularity = granularity;
    },
    addXLabels: function() {
      var range = (maxX - minX) / 1000,
          granularity = this.granularity,
          nearest = GRANULARITY_TO_SECONDS[granularity],
          smallestIncrement = Math.round(range / MAX_NUMBER_OF_X_LABELS / nearest) * nearest,
          n;

      for (n=minX; n<maxX; n+=(smallestIncrement*1000)) {
        this.addXLabel(this.getFormattedShortDate(new Date(n), granularity), (n - minX) * scaleX);
      }
    }, 

    getFormattedShortDate: function(date, granularity) {
      switch(granularity) {
        case 0: return date.format('yyyy'); // year
        case 1: return date.format('yy mmm');  // month
        case 2: return date.format('mmm dd'); // day
        case 3: return date.format('ddd htt'); // hours
        case 4: return date.format('h:MMtt'); // minute
        default: return date.format('MM:sstt'); // seconds
      }
    },
    getFormattedLongDate: function(date, granularity) {
      switch(granularity) {
        case 0: return date.format('yyyy'); // year
        case 1: return date.format('yyyy mmm');  // month
        case 2: return date.format('yyyy mmm dd'); // day
        case 3: return date.format('yyyy mmm dd h:00tt'); // hours
        case 4: return date.format('yyyy mmm dd h:MMtt'); // minute
        default: return date.format('yyyy mmm dd h:MM:sstt'); // seconds
      }
    },
    addXLabel: function(str, x) {
      var y = this.layout.height - 16,
          skin = this.skin,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          label = new Kinetic.Label({
            x: x,
            y: y
          });

      label.add(tag).add(text);
      this.topLabelLayer.add(label);
    },
    addYLabel: function(str, y) {
      var layout = this.layout,
          width = layout.width,
          height = layout.height,
          bottomLabelLayer = this.bottomLabelLayer,
          topLabelLayer = this.topLabelLayer,
          skin = this.skin,
          gridLineColor = skin.gridLine,
          textColor = skin.text,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          backgroundColor = skin.background,
          label = new Kinetic.Label({
            y: y + 2
          }),
          line = new Kinetic.Line({
            stroke: gridLineColor,
            strokeWidth: 2,
            points: [0, 0, width, 0],
            y: y
          });

      label.add(tag).add(text);
       
      bottomLabelLayer.add(line); 
      this.topLabelLayer.add(label);
    },
    setMinMax: function() {
      var model = this.model,
          layout = this.layout,
          lines = model.lines,
          len = lines.length,
          width = layout.width,
          height = layout.height,
          firstPoint = lines[0].points[0],
          firstPointX = firstPoint.x,
          firstPointY = firstPoint.y,
          n, i, pointsLen, point, pointX, pointY;
      
      minX = firstPointX;
      minY = firstPointY;
      maxX = firstPointX;
      maxY = firstPointY;
          
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
      
      scaleX = width / (maxX - minX);
      scaleY = height / (maxY - minY);
    },
    addMarker: function(color) {
      var marker = new Kinetic.Group(),
          skin = this.skin,
          markerSkin = skin.sliderLabel,
          textSkin = markerSkin.text,
          rectSkin = markerSkin.tag,
          node = new Kinetic.Circle({
            fill: color,
            radius: 6,
            stroke: skin.background,
            strokeWidth: 3
          }),
          text = new Kinetic.Text(Meteor.Util.merge(textSkin, {
              text: EMPTY_STRING
            })),
          tag = new Kinetic.Tag(Meteor.Util.merge(rectSkin, {
              pointerDirection: 'left',
              pointerWidth: 5,
              pointerHeight: textSkin.fontSize + (2*textSkin.padding),
              lineJoin: 'round'
            })),
          tooltip = new Kinetic.Label({
            x: 5
          });

      tooltip.add(tag).add(text);  
      marker.add(node).add(tooltip);
      marker.tooltip = tooltip;
      this.interactionLayer.add(marker);
      this.markers.push(marker);    
    },
    addLines: function() {
      var model = this.model,
        lines = model.lines,
        len = lines.length,
        color, backgroundColor, n, line, lineObj, points, pointsLen;
  
      for (n=0; n<len; n++) {
        line = lines[n],
        points = line.points,
        pointsLen = points.length,
        color = this.getLineColor(n),
        backgroundColor = this.skin.background;
        
        lineObj = new Kinetic.Line({
          points: points,
          stroke: color,
          strokeWidth: 2,
          lineJoin: 'round',
          strokeScaleEnabled: false,
          offsetX: minX
        });
        
        this.addLineTitle(line.title, this.getChartY(points[pointsLen - 1].y));
        this.addMarker(color);
        this.mainLayer.add(lineObj);  
        
      }
    },
    addLineTitle: function(str, y) {
      var skin = this.skin,
          lineLabelSkin = skin.lineLabel,
          layout = this.layout,
          text = new Kinetic.Text(Meteor.Util.merge(lineLabelSkin.text, {
              text: str
            })),
          tag = new Kinetic.Tag(Meteor.Util.merge(lineLabelSkin.tag, {
              pointerDirection: 'right',
              pointerHeight: lineLabelSkin.fontSize + (2*lineLabelSkin.padding),
              pointerWidth: 5,
              lineJoin: 'round'
            })),
          label = new Kinetic.Label({
            x: layout.width,
            y: y
          });

      label.add(tag).add(text);
             
      this.middleLabelLayer.add(label);

    },
    getFormattedYLabel: function(label) {
      return label + SPACE + this.units;
    }
  };
  
  Meteor.Util.extend(Meteor.Line, Meteor.Chart);
})();