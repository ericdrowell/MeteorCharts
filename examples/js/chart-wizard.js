var OPTIONS_CONTAINER = document.getElementById('options'),
    PAGE = 1,
    LAYOUT = 'SparkChart',
    THEME = 'CoteAzur';

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
  config.theme = MeteorChart.Themes[THEME];
  for (var key in MeteorChart.Layouts) {
    var li = document.createElement('li');
    var title = document.createElement('h3');
    var anchor = document.createElement('a');
    
    title.innerHTML = key;
    anchor.setAttribute('href', '#');
    anchor.setAttribute('data-layout', key);

    li.appendChild(title);
    li.appendChild(anchor);
    OPTIONS_CONTAINER.appendChild(li);
  
    
    config.container = anchor;
    config.layout = MeteorChart.Layouts[key];
  
    new MeteorChart(config);
  }
}

function renderThemes() {
  config.layout = MeteorChart.Layouts[LAYOUT];
  for (var key in MeteorChart.Themes) {
    var li = document.createElement('li');
    var title = document.createElement('h3');
    var anchor = document.createElement('a');
    
    title.innerHTML = key;
    anchor.setAttribute('href', '#');

    li.appendChild(title);
    li.appendChild(anchor);
    OPTIONS_CONTAINER.appendChild(li);
  
    
    config.container = anchor;
    config.theme = MeteorChart.Themes[key];
  
    new MeteorChart(config);
  }
}

$(function() {
  $('#content').on('click', function(evt) {
    var $target = $(evt.target);
    
    // if clicking on steps
    if ($target.closest('#steps a').length) {
      evt.preventDefault(); 
      PAGE = $target.closest('#steps a').data('page');
    }
    
    // if clicking on a chart
    else if ($target.closest('#options > li > a').length) {
      evt.preventDefault();
      LAYOUT = $target.closest('#options > li > a').data('layout') || LAYOUT;
    }
    
    console.log('===== STATE =====');
    console.log('PAGE  = ' + PAGE);
    console.log('LAYOUT = ' + LAYOUT);
    console.log('THEME = ' + THEME);
  });
  renderLayouts();
});


