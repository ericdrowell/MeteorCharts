(function() {
  MeteorChart.Component.extend('Tooltip', {
    init: function() {
      // NOTE: the pointerEvents style is not supported in IE < 11
      // therefore, older IE users might have the tooltip stuck under
      // the cursor from time to time
      this.content.style.pointerEvents = 'none';

      this.tooltip = MeteorChart.Dom.createElement('div');

      this.tooltipTitle = MeteorChart.Dom.createElement('h2');
      this.tooltipTitle.style.whiteSpace = 'nowrap';

      this.tooltipContent = MeteorChart.Dom.createElement('p');
      this.tooltipContent.style.whiteSpace = 'nowrap';

      this.tooltip.appendChild(this.tooltipTitle);
      this.tooltip.appendChild(this.tooltipContent);
      this.content.appendChild(this.tooltip);
    },
    _render: function() {
      var data = this.data,
          style = this.style,
          theme = this.chart.theme;

      if (data && data.title && data.content) {
        // tooltip
        this.tooltip.style.display = 'inline-block';
        this.tooltip.style.fontFamily = style.fontFamily || theme.fontFamily;
        this.tooltip.style.color = style.fontColor || theme.primary;
        this.tooltip.style.padding = this.padding(-3);
        this.tooltip.style.border = '2px solid ' + (style.borderColor || theme.secondary); 
        this.tooltip.style.backgroundColor = style.backgroundColor || theme.background; 

        // title
        this.tooltipTitle.style.fontSize = (style.fontSize || theme.fontSize) * MeteorChart.Constants.TYPOGRAPHIC_SCALE;
        this.tooltipTitle.innerHTML = data.title;

        // content
        this.tooltipContent.style.fontSize = style.fontSize || theme.fontSize;
        this.tooltipContent.style.marginTop = 5;
        this.tooltipContent.innerHTML = data.content;
      }
      else {
        this.tooltip.style.display = 'none';
      }
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'width', function() {
    return this.tooltip.offsetWidth;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'height', function() {
    return this.tooltip.offsetHeight;
  });

})();