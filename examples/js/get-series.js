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