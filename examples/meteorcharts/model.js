var start = 0; // 0 seconds
var end = start + (Math.round(Math.random() * 50) + 5) * 60; 
var diff = end - start;
var numDataPoints = 1000;
var increment = diff / numDataPoints;

function getModel() {
  var model = {
    title: 'Example Chart',
    xAxis: {
      units: 'Seconds'
    },
    yAxis: {
      units: 'Numbers'
    },
    lines: []
  };

  // create lines
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

    model.lines.push(line);
  }

  return model;
}

function updateModel(model) {
  var firstPoints = model.lines[0].points;
  var start = firstPoints[firstPoints.length-1].x;
  var end = start + (1 * 60);

  // create lines
  for (var n=0; n<3; n++) {
    var points = model.lines[n].points
    var lastY = points[points.length-1].y;
    
    // create points
    for (var i=start; i<end; i+=increment) {
      var y = Math.round((lastY + (Math.random() * 10000) - 5000) * 1);
      lastY = y;
      model.lines[n].points.shift();

      model.lines[n].points.push({
          x: i,
          y: y
      });
    }
  }
}
