function Grapher(config) {
  var minX = config.minX,
      minY = config.minY,
      maxX = config.maxX,
      maxY = config.maxY,
      increment = config.increment,
      equations = config.equations,
      len = equations.length,
      series = [],
      n, x, equation, currentSeries, func, y;

  for (n=0; n<len; n++) {
    equation = equations[n];
    func = equation.func;
    currentSeries = {
      title: equation.title,
      points: []
    };

    for (x=minX; x<=maxX; x+=increment) {
      y = Math.round(func(x) * 100) / 100;
      if (y>=minY && y<=maxY) {
        currentSeries.points.push(Math.round(x * 100) / 100);
        currentSeries.points.push(y);
      }
    }

    series.push(currentSeries);
  }

  return series;
}