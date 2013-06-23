(function() {
  Meteor.Title = function(chart) {
	  var chart = this.chart = chart,
	      model = this.model = chart.model,
	      str = model.str = '',
	      skin = this.skin = chart.skin,
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
	  label.setX(skin.width / 2);
	  chart.topLabelLayer.add(label);
  };

  Meteor.Title.prototype = {
    sync: function() {
      var chart = this.chart,
          model = this.model,
          skin = this.skin = chart.skin,
          tag = this.tag,
          label = this.label;

      text.setText(model.text);

      label.setOffset({
        x: label.getWidth() / 2
      });

      label.setX(skin.width / 2);

      return this;
    }
  };
})();