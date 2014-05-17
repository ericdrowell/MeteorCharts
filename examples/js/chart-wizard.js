var OPTIONS_CONTAINER = document.getElementById('options');
var LAYOUT, THEME;

var config = {
  container: 'container',
  width: 445,
  height: 250,

  components: {
    title: {
      data: 'Awesome Blossom Possum'
    },
    lineSeries: {
      data: {
        series: [
          {
            title: 'Series 1',
            points: [
              -100, -100,
              100, 100,
              200, 50
            ]
          },
          {
            title: 'Series 2',
            points: [
              0, 100,
              100, 200,
              200, 150,
              300, 200
            ]
          }
        ]
      }
    },
    xAxis: {
      data: function() {
        return this.chart.components.lineSeries.getViewportMinMaxX();
      },
      style: {
        increment: 100
      }
    },
    yAxis: {
      data: function() {
        return this.chart.components.lineSeries.getViewportMinMaxY();
      },
      style: {
        increment: 100
      }
    },
    paginator: {
      data: {
        min: 0,
        max: 10,
        value: 0,
        step: 1
      },
      style: {
        template: '{value} of {max}'
      },
      width: 90
    },
    slider: {
      style: {
        handleWidth: 40,
        handleHeight: 10
      }
    },
    verticalGridLines: {
      data: function() {
        return this.chart.components.xAxis.getLabelOffsets();
      }
    },
    horizontalGridLines: {
      data: function() {
        return this.chart.components.yAxis.getLabelOffsets();
      }
    }
  }
          
};

function renderLayouts() {
  config.theme = THEME || MeteorChart.Themes.CoteAzur
  for (var key in MeteorChart.Layouts) {
    var li = document.createElement('li');
    var title = document.createElement('h3');
    var container = document.createElement('div');
    
    title.innerHTML = key;
    
    li.appendChild(title);
    li.appendChild(container);
    OPTIONS_CONTAINER.appendChild(li);
  
    
    config.container = container;
    config.layout = MeteorChart.Layouts[key];
  
    new MeteorChart(config);
  }
}

function renderThemes() {
  config.layout = LAYOUT || MeteorChart.Layouts.StandardLineChart
  for (var key in MeteorChart.Themes) {
    var li = document.createElement('li');
    var title = document.createElement('h3');
    var container = document.createElement('div');
    
    title.innerHTML = key;
    
    li.appendChild(title);
    li.appendChild(container);
    OPTIONS_CONTAINER.appendChild(li);
  
    
    config.container = container;
    config.theme = MeteorChart.Themes[key];
  
    new MeteorChart(config);
  }
}

renderLayouts();
