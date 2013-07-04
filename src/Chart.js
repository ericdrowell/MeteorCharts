(function() { 
  // constants
  var LEFT = 'left',
      CENTER = 'center',
      AUTO = 'auto',
      EMPTY_STRING = '',
      TEXT = 'Text',
      SPACE = ' ',
      MOUSEMOVE = 'mousemove',
      MOUSEOUT = 'mouseout',
      MOUSEOVER = 'mouseover',
      TOUCHMOVE = 'touchmove',
      TOUCHSTART = 'touchstart',
      TOUCHEND = 'touchend';

  Meteor.Chart = function(config) {
    this._init(config); 
  };
  
  Meteor.Chart.prototype = {
    _init: function(config) {
      var that = this,
          model = this.model = config.model || {},
          skin = this.skin = config.skin || {},
          behavior = this.behavior = config.behavior || {},
          title = model.title || EMPTY_STRING,
          container, titleWidth, halfTitleWidth;
          
      // create stage
      this.stage = new Kinetic.Stage({
        width: skin.width || 0,
        height: skin.height || 0,
        container: config.container,
        listening: false
      });

      container = this.stage.getContainer();
      container.style.display = 'inline-block';
      container.style.backgroundColor = skin.background;

      // layers
      this.bottomLayer = new Kinetic.Layer();
      this.dataLayer = new Kinetic.Layer(); 
      this.interactionLayer = new Kinetic.Layer({
        opacity: 0 
      });
      this.topLayer = new Kinetic.Layer();

      // add meteor classes
      this.bottomLayer.getCanvas().getElement().className = 'meteorcharts-bottom-layer';
      this.dataLayer.getCanvas().getElement().className = 'meteorcharts-data-layer';
      this.interactionLayer.getCanvas().getElement().className = 'meteorcharts-interaction-layer';
      this.topLayer.getCanvas().getElement().className = 'meteorcharts-top-layer';
      
      
      this.stage.add(this.bottomLayer);
      this.stage.add(this.dataLayer);
      this.stage.add(this.topLayer);
      this.stage.add(this.interactionLayer);
      
      this.title = new Meteor.Title(this);

      this.interactionAnim = new Kinetic.Animation(function() {
      }, this.interactionLayer);

      this.interactionShow = new Kinetic.Tween({
        node: that.interactionLayer,
        duration: 0.3,
        opacity: 1,
        easing: Kinetic.Easings.EaseInOut
      });

      // interaction components
      this.zoom = new Meteor.Zoom(this);
      this.tooltip = new Meteor.Tooltip(this);

      this._bind();
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
    _bind: function() {
      var stage = this.stage,
          content = stage.getContent(),
          that = this;
      
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

      // only one interaction component should be visible at a time
      this.zoom.rect.on('visibleChange', function(evt) {
        that.tooltip.group.setVisible(!evt.newVal);
      });
    },
    buildLabel: function(str, x, y, fontSize, textColor, backgroundColor) {
      var skin = this.skin,
          topLayer = this.topLayer,
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