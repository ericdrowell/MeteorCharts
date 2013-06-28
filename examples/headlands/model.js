var MODEL = {
  title: 'Headlands Tech',
  xAxis: {
    units: 'Seconds'
  },
  yAxis: {
    units: 'Numbers'
  },
  lines: []
};

var start = 0; // 0 seconds
var end = (Math.round(Math.random() * 50) + 5) * 60; 

/*
var start = 1104577200 * 1000; // Jan 1 2005 3:00
var end = 1104588000 * 1000; // Jan 1 2005 6:00
*/

var diff = end - start;
var numDataPoints = 1000;
var increment = diff / numDataPoints;

// create lines
for (var n=0; n<3; n++) {
  var line = {
    title: 'Line Title ' + n,
    points: [] 
  }
  var lastY = Math.round(((Math.random() * 100000) - 50000) * 1);
  
  // create points
  for (var i=start; i<end; i+=increment) {
    var y = Math.round((lastY + (Math.random() * 10000) - 5000) * 1);
    lastY = y;
    line.points.push({
        x: i,
        y: y
    });
  }

  MODEL.lines.push(line);
}

function updateModel() {
  var firstPoints = MODEL.lines[0].points;
  var start = firstPoints[firstPoints.length-1].x;
  var end = start + (0.1 * 60);

  // create lines
  for (var n=0; n<3; n++) {
    var points = MODEL.lines[n].points
    var lastY = points[points.length-1].y;
    
    // create points
    for (var i=start; i<end; i+=increment) {
      var y = Math.round((lastY + (Math.random() * 10000) - 5000) * 1);
      lastY = y;
      MODEL.lines[n].points.shift();

      MODEL.lines[n].points.push({
          x: i,
          y: y
      });
    }
  }
}
