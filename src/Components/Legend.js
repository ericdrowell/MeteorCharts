(function() {
  Meteor.Legend = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.addLabels();
  };

  Meteor.Legend.prototype = {
    addLabels: function() {
      var chart = this.chart,
          group = this.group,
          model = chart.model,
          skin = chart.skin,
          legendSkin = skin.legend,
          lines = model.lines,
          len = lines.length,
          x = 0,
          n, line, text, rect;

      for (n=0; n<len; n++) {
        line = lines[n];

        rect = new Kinetic.Rect(Meteor.Util.merge(legendSkin.rect, {
          fill: chart.getLineColor(n),
          x: x
        }));

        x += rect.getWidth();
        x += 3;

        text = new Kinetic.Text(Meteor.Util.merge(legendSkin.text, {
          text: line.title,
          x: x
        }));

        x += text.getWidth();

        if (n<len-1) {  
          x += legendSkin.spacing;
        }

        rect.setY((text.getHeight() - legendSkin.rect.size)/2);

        group.add(rect).add(text);
      } 

      group.setPosition(skin.width - x - 10, 5);

      chart.bottomLayer.add(group);
    }
  };
})();