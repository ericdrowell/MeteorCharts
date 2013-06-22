(function() {
  Meteor.Title = function(chart) {
  	this.chart = chart;
  	return this;
  };

  Meteor.Title.prototype = {
    render: function() {
      if (this.label) {
      	this.label.destroy();
      }

      var chart = this.chart,
          model = this.model = chart.model,
          str = model.str = '',
          skin = this.skin = chart.skin,
          layout = this.layout = chart.layout,
          text = this.text = new Kinetic.Text(Meteor.Util.merge(skin.titleLabel, {
            text: model.title
          })),
          tag = this.tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          label = this.label = new Kinetic.Label();

      label.add(tag).add(text);
  
      label.setOffset({
        x: label.getWidth() / 2
      });
      label.setX(layout.width / 2);
      chart.topLabelLayer.add(label);

      return this;
    }
  };
})();