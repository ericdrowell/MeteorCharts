(function() {
  MeteorChart.Component.extend('Slider', {
    init: function() {

    },
    render: function() {

    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'width', function() {
    return this.options.width;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.options.height;
  });

})();