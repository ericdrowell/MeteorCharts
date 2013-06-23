var model = {
  title: 'Example Line Chart',
  xAxis: {
    units: 'Seconds'
  },
  yAxis: {
    units: 'Numbers'
  },
  lines: []
};

var start = 0; // 0 seconds
var end = (Math.round(Math.random() * 50) + 5) * 60; // 10 minutes

/*
var start = 1104577200 * 1000; // Jan 1 2005 3:00
var end = 1104588000 * 1000; // Jan 1 2005 6:00
*/

var diff = end - start;
var numDataPoints = 500;
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

  model.lines.push(line);
}
