(function() {
  var PX = 'px';

  MeteorChart.Component.extend('Legend', {
    defaults: {
      width: function() {
        return MeteorChart.DOM.getElementWidth(this.list);
      },
      height: function() {
        return MeteorChart.DOM.getElementHeight(this.list);
      },
      orientation: 'horizontal'
    },
    init: function() {
      this.list = MeteorChart.DOM.createElement('ol');
      this.content.appendChild(this.list);
    },
    _render: function() {
      var chart = this.chart,
          theme = chart.theme,
          data = this.get('data'),
          len = data.length,
          n, ser;

      // clear the list
      this.list.innerHTML = '';

      for (n=0; n<len; n++) {
        title = data[n];
        this._addItem(this.getDataColor(n), title, n === len - 1);
      }
    },
    _addItem: function(color, str, last) {
      var chart = this.chart,
          theme = chart.theme,
          style = this.get('style'),
          orientation = this.get('orientation'),
          item = MeteorChart.DOM.createElement('li'),
          box =  MeteorChart.DOM.createElement('span'),
          text = MeteorChart.DOM.createElement('span');

      if (orientation === 'horizontal') {
        item.style.display = 'inline-block';

        if (!last) {
          item.style.marginRight = 10 + PX;
        }
      }
      else {
        item.style.display = 'block';
        item.style.marginBottom = 10 + PX;
      }


      box.style.backgroundColor = color;
      box.style.width = this.fontSize() + PX;
      box.style.height = this.fontSize() + PX;
      box.style.display = 'inline-block';
      box.style.verticalAlign = 'top';

      text.innerHTML = str;
      text.style.display = 'inline-block';
      text.style.fontSize = this.fontSize() + PX;
      text.style.fontFamily = theme.fontFamily;
      text.style.color = theme.primary;
      text.style.verticalAlign = 'top';
      text.style.marginLeft = 5 + PX;

      item.appendChild(box);
      item.appendChild(text);
      this.list.appendChild(item);
    }
  });
})();