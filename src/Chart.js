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
      var model = config.model || {},
          title = config.title || model.title || EMPTY_STRING,
          titleWidth, halfTitleWidth,
          skin = config.skin || {};
 
      this.skin = skin; 
      this.container = config.container;
      this.model = model
      this.units = config.units || model.units || EMPTY_STRING;
      this.width = config.layout.width || 0;
      this.height = config.layout.height || 0;

      container.style.display = 'inline-block';
      container.style.backgroundColor = skin.background;
    
      // create stage
      this.stage = new Kinetic.Stage({
        width: this.width,
        height: this.height,
        container: 'container',
        listening: false
      });
        
      // layers
      this.bottomLabelLayer = new Kinetic.Layer();
      this.mainLayer = new Kinetic.Layer(); 
      this.middleLabelLayer = new Kinetic.Layer();
      this.interactionLayer = new Kinetic.Layer({
        opacity: 0 
      });
      this.topLabelLayer = new Kinetic.Layer();
      
      
      this.stage.add(this.bottomLabelLayer);
      this.stage.add(this.mainLayer);
      this.stage.add(this.middleLabelLayer);
      this.stage.add(this.interactionLayer);
      this.stage.add(this.topLabelLayer);
      
      this.addTitle(title);
    },
    addTitle: function(str) {
      var skin = this.skin,
          text = new Kinetic.Text(Meteor.Util.merge(skin.titleLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          label = new Kinetic.Label();

      label.add(tag).add(text);
      
      label.setOffset({
          x: label.getWidth() / 2
      });
      label.setX(this.width / 2);
      this.topLabelLayer.add(label);  
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