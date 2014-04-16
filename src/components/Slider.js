(function() {
  MeteorChart.Component.extend('Slider', {
    init: function() {
      var showTrack = this.options.showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      if (showTrack) {
        this.track = MeteorChart.Dom.createElement('div');
        this.track.style.position = 'absolute';
        this.content.appendChild(this.track);
      }
      
      this.handle = MeteorChart.Dom.createElement('span');
      this.handle.style.display = 'inline-block';
      this.handle.style.position = 'absolute';
      this.content.appendChild(this.handle);

      this._bind();
    },
    render: function() {
      var handle = this.handle,
          track = this.track,
          options = this.options,
          style = this.style(),
          theme = this.chart.theme,
          handleWidth = options.handleWidth,
          handleHeight = options.handleHeight,
          trackSize = 1,
          showTrack = this.options.showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      // handle
      handle.style.width = handleWidth;
      handle.style.height = handleHeight;
      handle.style.backgroundColor = style.handleFill || theme.primary;
      MeteorChart.Dom.setBorderRadius(handle, Math.min(handleWidth, handleHeight) / 2);

      // track
      if (showTrack) {
        track.style.backgroundColor = theme.secondary, 0.1;
      }

      if (options.orientation === 'vertical') {
        handle.style.top = 0;
        handle.style.left = 0;

        if (showTrack) {
          this.track.style.width = trackSize;
          this.track.style.height = this.height();
          this.track.style.left = (this.width() - trackSize) / 2;
        }
      }
      else {
        handle.style.top = 0;
        handle.style.left = 0;

        if (showTrack) {
          this.track.style.width = this.width();
          this.track.style.height = trackSize;
          this.track.style.top = (this.height() - trackSize) / 2;
        }
      }

      
      
      
    },
    _bind: function() {
      var that = this,
          handle = this.handle,
          chartContent = this.chart.content,
          orientation = this.options.orientation || 'horizontal',
          startOffsetPos = null,
          startPointerPos = null;

      // start drag & drop
      handle.addEventListener('mousedown', function(evt) {
        // prevent browser from trying to select stuff when dragging
        evt.preventDefault();

        if (orientation === 'horizontal') {
          startOffsetPos = MeteorChart.Dom.getNumber(handle.style.left);
          startPointerPos = evt.clientX;
        }
        else {
          startOffsetPos = MeteorChart.Dom.getNumber(handle.style.top);
          startPointerPos = evt.clientY;
        }

        that.fire('dragstart');
      }); 

      // drag
      document.body.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        if (startOffsetPos !== null) {
          var diff, newOffset;

          if (orientation === 'horizontal') {
            diff = that.width() - that.options.handleWidth;
            pointerPos = evt.clientX;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.left = newOffset;
          }
          else {
            diff = that.height() - that.options.handleHeight;
            pointerPos = evt.clientY;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.top = newOffset;    
          }



          that.fire('dragmove', {
            offset: newOffset
          });
        }
      }, 17));
 
      // end drag & drop
      document.body.addEventListener('mouseup', function(evt) {
        startOffsetPos = null;
        startPointerPos = null;

        that.fire('dragend');
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
    return this.options.handleWidth;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.options.handleHeight;
  });

})();