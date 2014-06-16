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

      this.tooltip.appendChild(this.tooltipTitle);
      this.tooltip.appendChild(this.tooltipContent);
      this.content.appendChild(this.tooltip);
    },
    _render: function() {
      var data = this.get('data'),
         chart = this.chart,
          style = this.get('style'),
          theme = this.chart.theme;

      if (data && data.title && data.content) {
        // tooltip
        this.tooltip.style.display = 'inline-block';
        this.tooltip.style.fontFamily = style.fontFamily || theme.fontFamily;
        this.tooltip.style.color = style.fontColor || theme.primary;
        this.tooltip.style.padding = chart.padding(-1) + PX;
        this.tooltip.style.border = '2px solid ' + (style.borderColor || theme.secondary); 
        this.tooltip.style.backgroundColor = style.backgroundColor || theme.background; 

        // title
        this.tooltipTitle.style.fontSize = this.fontSize(0) + PX;
        this.tooltipTitle.innerHTML = data.title;

        // content
        this.tooltipContent.style.fontSize = this.fontSize(0) + PX;
        this.tooltipContent.style.marginTop = 5 + PX;
        this.tooltipContent.innerHTML = data.content;
      }
      else {
        this.tooltip.style.display = 'none';
      }
    }
  });
})();