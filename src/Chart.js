(function() { 
  // constants
  var LEFT = 'left',
      CENTER = 'center',
      AUTO = 'auto',
      EMPTY_STRING = '',
      TEXT = 'Text',
      RECT = 'Rect';
      
  Meteor.Chart = function(config) {
    this._init(config); 
  };
  
  Meteor.Chart.prototype = {
    _init: function(config) {
      var model = this.model = config.model || {},
          skin = this.skin = config.skin || {},
          layout = this.layout = config.layout || {},
          title = model.title || EMPTY_STRING,
          container, titleWidth, halfTitleWidth;
          
      // create stage
      this.stage = new Kinetic.Stage({
        width: layout.width || 0,
        height: layout.height || 0,
        container: config.container,
        listening: false
      });

      container = this.stage.getContainer();
      container.style.display = 'inline-block';
      container.style.backgroundColor = skin.background;

      // layers
      this.bottomLabelLayer = new Kinetic.Layer();
      this.dataLayer = new Kinetic.Layer(); 
      this.middleLabelLayer = new Kinetic.Layer();
      this.interactionLayer = new Kinetic.Layer({
        opacity: 0 
      });
      this.topLabelLayer = new Kinetic.Layer();
      
      
      this.stage.add(this.bottomLabelLayer);
      this.stage.add(this.dataLayer);
      this.stage.add(this.middleLabelLayer);
      this.stage.add(this.interactionLayer);
      this.stage.add(this.topLabelLayer);
      
      this.title = new Meteor.Title(this);
    },
    getLineColor: function(n) {
      var line = this.skin.line,
          len = line.length;
          
      return line[n % len]; 
    },
    buildLabel: function(str, x, y, fontSize, textColor, backgroundColor) {
      var skin = this.skin,
          topLabelLayer = this.topLabelLayer,
          label = new Kinetic.Group({
            x: x,
            y: y 
          });
          text = new Kinetic.Text({
            fill: textColor || skin.text,
            text: str,
            fontSize: fontSize || 16,
            name: TEXT
          });
          
          rect = new Kinetic.Rect({
            fill: backgroundColor || skin.background,
            width: text.getWidth(),
            height: text.getHeight(),
            opacity: 0.7,
            name: RECT
          }); 
      
      label.add(rect).add(text);

      return label;
    }
  };
})();