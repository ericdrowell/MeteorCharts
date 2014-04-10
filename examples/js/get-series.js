function getSeries(config) {
  var minX = config.minX,
      minY = config.minY,
      maxX = config.maxX,
      maxY = config.maxY,
      rangeX = maxX - minX,
      rangeY = maxY - minY,
      numLines = config.numLines,
      numPoints = config.numPoints,
      series = [],
      yVariance = config.yVariance,
      xIncrement = Math.round(rangeX / numPoints),
      lastY = Math.random() * rangeY + minY;

  for (var n=0; n<numLines; n++) {
    var points = [], y;

    for (var x=minX; x<=maxX; x+=xIncrement) {
      y = Math.round(lastY + (Math.random() * yVariance) - (yVariance/2));
      points.push(x);
      points.push(y);
      lastY = y;
    }

    series.push({
      title: 'Series ' + n,
      points: points
    });
  }

  return series;
}

function shiftSeries(config) {
  var data = config.data,
      yVariance = config.yVariance,
      xIncrement = config.xIncrement,
      series = data.series,
      numPoints = config.numPoints,
      len = series.length,
      n, points;

  for (var i=0; i<numPoints; i++) {
    for (n=0; n<len; n++) {
      points = series[n].points;
      points.shift();
      points.shift();

      
      points.push(points[points.length-2] + xIncrement);
      points.push(points[points.length-2] + (Math.random() * yVariance) - (yVariance/2));
    }
  }

  return data;
}