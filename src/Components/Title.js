(function() {
  Meteor.Title = function(chart) {
    var chart = this.chart = chart,
        model = this.model = chart.model,
        str = model.str = '',
        skin = this.skin = chart.skin,
        text = this.text = new Kinetic.Text(Meteor.Util.merge({
            fill: skin.text.fill
          }, skin.title.text, {
            text: model.title
          }
        ));

    chart.bottomLayer.add(text);
  };

  Meteor.Title.prototype = {

  };
})();