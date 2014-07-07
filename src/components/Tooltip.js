(function() {
  var PX = 'px';

  MeteorChart.Component.extend('Tooltip', {
    defaults: {
      width: function() {
        return this.tooltip.offsetWidth;
      },
      height: function() {
        return this.tooltip.offsetHeight;
      }
    },
    init: function() {
      // NOTE: the pointerEvents style is not supported in IE < 11
      // therefore, older IE users might have the tooltip stuck under
      // the cursor from time to time
      this.content.style.pointerEvents = 'none';

      this.tooltip = MeteorChart.DOM.createElement('div');

      this.tooltipTitle = MeteorChart.DOM.createElement('h2');
      this.tooltipTitle.style.whiteSpace = 'nowrap';

      this.tooltipContent = MeteorChart.DOM.createElement('p');
      this.tooltipContent.style.whiteSpace = 'nowrap';

      this.secondaryTriangle = MeteorChart.DOM.createElement('span');
      this.secondaryTriangle.style.width = 0;
      this.secondaryTriangle.style.height = 0;
      this.secondaryTriangle.style.display = 'inline-block';

      this.bgTriangle = MeteorChart.DOM.createElement('span');
      this.bgTriangle.style.width = 0;
      this.bgTriangle.style.height = 0;
      this.bgTriangle.style.display = 'inline-block';

      this.tooltip.appendChild(this.tooltipTitle);
      this.tooltip.appendChild(this.tooltipContent);
      this.tooltip.appendChild(this.secondaryTriangle);
      this.tooltip.appendChild(this.bgTriangle);
      this.content.appendChild(this.tooltip);
    },
    _render: function() {
      var that = this,
          data = this.get('data'),
          chart = this.chart,
          style = this.get('style'),
          theme = this.chart.theme;

      if (data && data.title && data.content) {
        // tooltip
        this.tooltip.style.display = 'inline-block';
        this.tooltip.style.fontFamily = style.fontFamily || theme.fontFamily;
        this.tooltip.style.color = style.fontColor || theme.primary;
        this.tooltip.style.padding = (theme.padding/2) + PX;
        this.tooltip.style.border = '2px solid ' + (style.borderColor || theme.secondary); 
        this.tooltip.style.backgroundColor = style.backgroundColor || theme.background; 

        // title
        this.tooltipTitle.style.fontSize = theme.fontSize + PX;
        this.tooltipTitle.innerHTML = data.title;

        // content
        this.tooltipContent.style.fontSize = theme.fontSize + PX;
        this.tooltipContent.style.marginTop = 5 + PX;
        this.tooltipContent.innerHTML = data.content;


        this._positionTooltip(); 
      }
      else {
        this.tooltip.style.display = 'none';
      }
    },
    _positionTooltip: function() {
      var theme = this.chart.theme,
          tooltip = this.tooltip,  
          triangleSize = 10,
          borderWidth = 2,
          secondaryTriangle = this.secondaryTriangle,
          bgTriangle = this.bgTriangle,
          width = MeteorChart.DOM.getElementWidth(tooltip),
          height = MeteorChart.DOM.getElementHeight(tooltip);

      // secondary triangle
      secondaryTriangle.style.border = triangleSize + 'px solid';
      secondaryTriangle.style.borderColor = theme.secondary + ' transparent transparent transparent';
      MeteorChart.DOM.setPosition(secondaryTriangle, height - borderWidth, null, null, (width)/2 - triangleSize);

      // bg triangle
      bgTriangle.style.border = triangleSize + 'px solid';
      bgTriangle.style.borderColor = theme.background + ' transparent transparent transparent';
      MeteorChart.DOM.setPosition(bgTriangle, height - (borderWidth * 2), null, null, (width)/2 - triangleSize);

      MeteorChart.DOM.setPosition(tooltip, -1 * height, null, null, -1 * width/2);
    }
  });
})();