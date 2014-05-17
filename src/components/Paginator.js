(function() {
  var PX = 'px';
  
  MeteorChart.Component.extend('Paginator', {
    defaults: {
      height: function() {
        return this.fontSize(0);
      }
    },
    init: function() {
      this.leftArrowSVG = MeteorChart.SVG.createElement('svg');
      this.leftArrowSVG.style.position = 'absolute';
      this.leftArrowSVG.style.left = 0;
      this.leftArrowSVG.style.top = 0;

      this.leftArrow = MeteorChart.SVG.createElement('path');
      this.leftArrowSVG.appendChild(this.leftArrow);

      this.text = MeteorChart.Dom.createElement('span');
      this.text.style.display = 'block';
      this.text.style.textAlign = 'center';

      this.rightArrowSVG = MeteorChart.SVG.createElement('svg');
      this.rightArrowSVG.style.position = 'absolute';
      this.rightArrowSVG.style.right = 0;
      this.rightArrowSVG.style.top = 0;

      this.rightArrow = MeteorChart.SVG.createElement('path');
      this.rightArrowSVG.appendChild(this.rightArrow);

      this.content.appendChild(this.leftArrowSVG);
      this.content.appendChild(this.text);
      this.content.appendChild(this.rightArrowSVG);

      this._bind();
    },
    _render: function() {
      var style = this.get('style'),
          theme = this.chart.theme,
          data = this.get('data'),
          leftArrowSVG = this.leftArrowSVG,
          leftArrow = this.leftArrow,
          text = this.text,
          rightArrowSVG = this.rightArrowSVG,
          rightArrow = this.rightArrow,
          arrowStrokeWidth = 4,
          arrowWidth = 10,
          arrowHeight = 12;

      // left arrow
      leftArrowSVG.setAttribute('width', arrowWidth + (arrowStrokeWidth * 2));
      leftArrowSVG.setAttribute('height', arrowHeight + (arrowStrokeWidth * 2));
      leftArrow.setAttribute('d', [
        'M', arrowStrokeWidth, ' ', (arrowHeight / 2) + arrowStrokeWidth, ' ',
        'L', arrowStrokeWidth + arrowWidth, ' ', arrowStrokeWidth, ' ',
        'L', arrowStrokeWidth + arrowWidth, ' ', arrowStrokeWidth + arrowHeight, ' ',
        'Z'
      ].join(''));
      leftArrow.setAttribute('fill', theme.secondary);
      leftArrow.setAttribute('stroke', theme.secondary);
      leftArrow.setAttribute('stroke-width', arrowStrokeWidth);
      leftArrow.setAttribute('stroke-linejoin', 'round');

      // content
      text.style.height = arrowHeight + (arrowStrokeWidth * 2);
      text.style.lineHeight = (arrowHeight + (arrowStrokeWidth * 2)) + 'px';
      text.innerHTML = MeteorChart.Util.replace(style.template, {
        value: data.value,
        max: data.max
      });
      text.style.fontSize = this.fontSize(0) + PX;
      text.style.fontFamily = theme.fontFamily;
      text.style.color = theme.primary;

      // right arrow
      rightArrowSVG.setAttribute('width', arrowWidth + (arrowStrokeWidth * 2));
      rightArrowSVG.setAttribute('height', arrowHeight + (arrowStrokeWidth * 2));
      rightArrow.setAttribute('d', [
        'M', arrowStrokeWidth + arrowWidth, ' ', (arrowHeight / 2) + arrowStrokeWidth, ' ',
        'L', arrowStrokeWidth, ' ', arrowStrokeWidth, ' ',
        'L', arrowStrokeWidth, ' ', arrowStrokeWidth + arrowHeight, ' ',
        'Z'
      ].join(''));
      rightArrow.setAttribute('fill', theme.secondary);
      rightArrow.setAttribute('stroke', theme.secondary);
      rightArrow.setAttribute('stroke-width', arrowStrokeWidth);
      rightArrow.setAttribute('stroke-linejoin', 'round');
    },
    _bind: function() {
      var that = this,
          leftArrow = this.leftArrow,
          rightArrow = this.rightArrow,
          oldValue;

      // cursors
      leftArrow.addEventListener('mouseover', function(evt) {
        leftArrow.style.cursor = 'pointer';
      });
      leftArrow.addEventListener('mouseout', function(evt) {
        leftArrow.style.cursor = 'default';
      });

      rightArrow.addEventListener('mouseover', function(evt) {
        rightArrow.style.cursor = 'pointer';
      });
      rightArrow.addEventListener('mouseout', function(evt) {
        rightArrow.style.cursor = 'default';
      });

      // clicks/touches
      leftArrow.addEventListener('mousedown', function(evt) {
        var data = that.get('data'),
            oldValue = data.value,
            newValue = oldValue - data.step;

        if (newValue >= data.min) {
          evt.preventDefault();
          that.get('data').value = newValue;
          that.render();
          that.fire('valueChange', {newValue: newValue, oldValue: oldValue});
        }
      });

      rightArrow.addEventListener('mousedown', function(evt) {
        var data = that.get('data'),
            oldValue = data.value,
            newValue = oldValue + data.step;

        if (newValue <= data.max) {
          evt.preventDefault();
          that.get('data').value = newValue;
          that.render();
          that.fire('valueChange', {newValue: newValue, oldValue: oldValue});
        }
      });

    }
  });
})();