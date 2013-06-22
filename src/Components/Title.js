(function() {
  Meteor.Title = function(chart) {
    var chart = this.chart = chart,
        str = this.str = str || '',
        skin = this.skin = chart.skin,
        layout = this.layout = chart.layout,
        model = this.model = chart.model,
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
  };
})();