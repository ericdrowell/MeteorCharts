var diff = end - start;
var numDataPoints = 500;
var increment = diff / numDataPoints;

function getModel() {
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
}

function updateModel(model) {
  var firstPoints = model.series[0].points;
  var start = firstPoints[firstPoints.length-1].x;
  var end = start + (1 * 60);

  // create series
  for (var n=0; n<3; n++) {
    var points = model.series[n].points
    var lastY = points[points.length-1].y;

    // create points
    for (var i=start; i<end; i+=increment) {
      var y = Math.round((lastY + (Math.random() * 10000) - 5000) * 1);
      lastY = y;
      model.series[n].points.shift();

      model.series[n].points.push({
          x: i,
          y: y
      });
    }
  }
}
