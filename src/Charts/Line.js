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
      
      this.xAxis = new Meteor.XAxis(this);
      this.yAxis = new Meteor.YAxis(this);

      this.stage.draw();

    },
    getChartY: function(y) {
      var height = this.layout.height;
      
      return height + (this.minY - y) * this.scaleY;
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
        
        this.addMarker(color);
        this.dataLayer.add(lineObj);  
      }
    },
    getFormattedYLabel: function(label) {
      return label + SPACE + this.model.yAxis.units;
    }
  };
  
  Meteor.Util.extend(Meteor.Line, Meteor.Chart);
})();