/*

      this.bind();
      
      this.interactionAnim = new Kinetic.Animation(function() {
      }, this.interactionLayer);

      this.interactionShow = new Kinetic.Tween({
        node: that.interactionLayer,
        duration: 0.3,
        opacity: 1,
        easing: Kinetic.Easings.EaseInOut
      });







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






*/