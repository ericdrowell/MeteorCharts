(function() { 
  Meteor.Line = function(config) {
    // super
    Meteor.Chart.call(this, config);
    this.init(config);
  };     
  
  Meteor.Line.prototype = {
    init: function(config) {
      this.shouldAutoSetMinMax = true;
      this.sync();
    },
    sync: function() {
      this.bottomLayer.destroyChildren();
      this.dataLayer.destroyChildren();
      this.topLayer.destroyChildren();

      this.dataWidth = 855;
      this.dataHeight = 335;
      this.dataX = 45;
      this.dataY = 40;

      if (this.shouldAutoSetMinMax) {
        this.autoSetMinMax();
        this.shouldAutoSetMinMax = true;
      }
      
      this.xAxis = new Meteor.XAxis(this);
      this.yAxis = new Meteor.YAxis(this);
      this.legend = new Meteor.Legend(this);
      this.title = new Meteor.Title(this);

      // transform data layer
      this.dataLayer.setY(this.dataHeight + this.dataY + (this.minY * this.scaleY));
      this.dataLayer.setX(this.dataX);
      this.dataLayer.setScale(this.scaleX, -1 * this.scaleY);

      // add lines and labels
      this.addLines();

      // update interaction layer
      this.pointerMove();

      this.stage.draw();
    },
    getLineColor: function(n) {
      var line = this.skin.data.lines,
          len = line.length;
          
      return line[n % len]; 
    },
    autoSetMinMax: function() {
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

      this.setMinMaxX(minX, maxX);
      this.setMinMaxY(minY, maxY); 
    },
    setMinMaxX: function(minX, maxX) {
      this.minX = minX;
      this.maxX = maxX;
      this.scaleX = this.dataWidth / (maxX - minX);
      this.shouldAutoSetMinMax = false;
    },
    setMinMaxY: function(minY, maxY) {
      this.minY = minY;
      this.maxY = maxY;
      this.scaleY = this.dataHeight / (maxY - minY);
      this.shouldAutoSetMinMax = false;
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
          color: this.getLineColor(n)
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
    dataToChart: function(x, y) {
      return {
        x: (x-this.minX) * this.scaleX + this.dataX,
        y: this.dataHeight - ((y - this.minY) * this.scaleY) + this.dataY
      };
    },
    chartToData: function(x, y) {
      return {
        x: ((x - this.dataX) / this.scaleX) + this.minX,
        y: this.minY - ((y - this.dataHeight - this.dataY) / this.scaleY)
      };
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
        
        this.dataLayer.add(lineObj);  
      }
    }
  };
  
  Meteor.Util.extend(Meteor.Line, Meteor.Chart);
})();