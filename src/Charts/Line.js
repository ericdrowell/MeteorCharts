(function() { 
  Meteor.Line = function(config) {
    // super
    Meteor.Chart.call(this, config);
    this.init(config);
  };     
  
  Meteor.Line.prototype = {
    init: function(config) {
      var that = this;

      this.dataWidth = 765;
      this.dataHeight = 400;
      this.dataX = 35;
      this.dataY = 40;
      this.setMinMax();
      
      // transform model layer
      this.dataLayer.setY(this.dataHeight + this.dataY + (this.minY * this.scaleY));
      this.dataLayer.setX(this.dataX);
      this.dataLayer.setScale(this.scaleX, -1 * this.scaleY);
      
      // add lines and labels
      this.addLines();
      
      this.xAxis = new Meteor.XAxis(this);
      this.yAxis = new Meteor.YAxis(this);

      this.tooltip = new Meteor.Tooltip(this);

      this.stage.draw();

    },
    getLineColor: function(n) {
      var line = this.skin.data.lines,
          len = line.length;
          
      return line[n % len]; 
    },
    setMinMax: function() {
      var model = this.model,
          skin = this.skin,
          lines = model.lines,
          len = lines.length,
          width = this.dataWidth,
          height = this.dataHeight,
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