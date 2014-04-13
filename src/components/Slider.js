(function() {
  MeteorChart.Component.extend('Slider', {
    init: function() {
      this.track = MeteorChart.Dom.createElement('div');
      
      this.handle = MeteorChart.Dom.createElement('span');
      this.handle.style.display = 'inline-block';
      this.handle.style.position = 'absolute';

      this.track.appendChild(this.handle)
      this.content.appendChild(this.track);

      this._bind();
    },
    render: function() {
      var handle = this.handle,
          track = this.track,
          options = this.options,
          theme = this.chart.theme,
          handleWidth = options.width,
          handleHeight = options.height;

      // handle
      handle.style.width = handleWidth;
      handle.style.height = handleHeight;
      handle.style.backgroundColor = theme.secondary;
      handle.style.borderRadius = Math.min(handleWidth, handleHeight) / 2;
      handle.style.left = 0;

      // track
      track.style.backgroundColor = MeteorChart.Util.hexToRgba(theme.secondary, 0.1);
      track.style.borderRadius = Math.min(handleWidth, handleHeight) / 2;
    },
    resize: function() {
      this.track.style.width = this.width();
      this.track.style.height = this.height();
    },
    _bind: function() {
      var that = this,
          handle = this.handle,
          chartContent = this.chart.content,
          startLeftPos = null,
          startPointerPos = null;

      // start drag & drop
      handle.addEventListener('mousedown', function(evt) {
        // prevent browser from trying to select stuff when dragging
        evt.preventDefault();

        startLeftPos = MeteorChart.Dom.getNumber(handle.style.left);
        startPointerPos = evt.clientX;
      }); 

      // drag
      document.body.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        if (startLeftPos !== null) {
          var diff = that.width() - that.options.width,
              newLeftPos;

          pointerPos = evt.clientX;
          newLeftPos = pointerPos - startPointerPos + startLeftPos;

          if (newLeftPos < 0) {
            newLeftPos = 0;
          }
          else if (newLeftPos > diff) {
            newLeftPos = diff;
          }
          
          handle.style.left = newLeftPos;
        }
      }, 17));
 
      // end drag & drop
      document.body.addEventListener('mouseup', function(evt) {
        startLeftPos = null;
        startPointerPos = null;
      }); 

      // cursors
      handle.addEventListener('mouseover', function(evt) {
        handle.style.cursor = 'pointer';
      }); 
      handle.addEventListener('mouseout', function(evt) {
        handle.style.cursor = 'default';
      });

    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'width', function() {
    return this.options.width;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.options.height;
  });

})();