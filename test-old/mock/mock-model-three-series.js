
var MOCK_MODEL_THREE_SERIES = (function(){
  var start = 31500000; //31500000; 
  var end = start + 31500000;
  var diff = end - start;
  var numDataPoints = 500;
  var increment = diff / numDataPoints;

  var model = {
    title: 'Example Chart',
    series: []
  };

  // create series
  for (var n=0; n<3; n++) {
    var line = {
      title: 'Line Title ' + n,
      points: []
    }
    var lastY = Math.round(((Math.random() * 10000000) - 5000000) * 1);

    // create points
    for (var i=start; i<end; i+=increment) {
      var y = Math.round((lastY + (Math.random() * 1000000) - 500000) * 1);
      lastY = y;
      line.points.push({
          x: i,
          y: y
      });
    }

    model.series.push(line);
  }

  return model;
})();
