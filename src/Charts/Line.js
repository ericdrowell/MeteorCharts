(function() {
  var EMPTY_STRING = '',
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
      MAX_POINT_DIST = 10;
  
  Meteor.Line = function(config) {
    // super
    Meteor.Chart.call(this, config);
    this.init(config);
  };     
  
  Meteor.Line.prototype = {
    init: function(config) {
      var that = this;

      this.setMinMax();
      
      this.markers = [];
      this.tooltips = [];
      
      // transform model layer
      this.dataLayer.setY(this.layout.height + (this.minY * this.scaleY));
      this.dataLayer.setScale(this.scaleX, -1 * this.scaleY);
      
      // add lines and labels
      this.addLines();
      this.addYLabels();
      //this.xAxis = new Meteor.XAxis(this);

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
          minX = this.minX,
          minY = this.minY,
          scaleX = this.scaleX,
          scaleY = this.scaleY,
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
          minX = this.minX,
          maxX = this.maxX,
          scaleX = this.scaleX,
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
      
      return height + (this.minY - y) * this.scaleY;
    },
    addYLabels: function() {
      var minY = this.minY,
          maxY = this.maxY,
          range = maxY - minY,
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
      
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;
      this.scaleX = width / (maxX - minX);
      this.scaleY = height / (maxY - minY);
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
        minX = this.minX,
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
        this.dataLayer.add(lineObj);  
        
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