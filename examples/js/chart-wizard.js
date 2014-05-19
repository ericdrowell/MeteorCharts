var $OPTIONS_CONTAINER = $('#options'),
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
    var $li = $(document.createElement('li'));
    var $title =$(document.createElement('h3'));
    var $anchor = $(document.createElement('a'));
    
    $title.html(key);
    $anchor.attr('href', '#');
    $anchor.data('layout', key);

    $li.append($title);
    $li.append($anchor);
    $OPTIONS_CONTAINER.append($li);
  
    
    config.container = $anchor[0];
    config.layout = MeteorChart.Layouts[key];
  
    new MeteorChart(config);
  }
}

function renderThemes() {
  config.layout = MeteorChart.Layouts[LAYOUT];
  for (var key in MeteorChart.Themes) {
    var $li = $(document.createElement('li'));
    var $title =$(document.createElement('h3'));
    var $anchor = $(document.createElement('a'));
    
    $title.html(key);
    $anchor.attr('href', '#');
    $anchor.data('theme', key);

    $li.append($title);
    $li.append($anchor);
    $OPTIONS_CONTAINER.append($li);
  
    
    config.container = $anchor[0];
    config.theme = MeteorChart.Themes[key];
  
    new MeteorChart(config);
  }
}

function setPage(num) {
  PAGE = num;
  
  // update steps
  $('#steps').removeClass('page1');
  $('#steps').removeClass('page2');
  $('#steps').removeClass('page3');
  
  $('#steps').addClass('page' + num);
  
  // udpate options
  $('#options').html('');
  
  switch(num) {
    case 1: renderLayouts(); break;
    case 2: renderThemes(); break;
  }
}

$(function() {
  $('#content').on('click', function(evt) {
    var $target = $(evt.target);
    
    // if clicking on steps
    if ($target.closest('#steps a').length) {
      evt.preventDefault(); 
      setPage($target.closest('#steps a').data('page'));
    }
    
    // if clicking on a chart
    else if ($target.closest('#options > li > a').length) {
      evt.preventDefault();
      LAYOUT = $target.closest('#options > li > a').data('layout') || LAYOUT;
      setPage(2);
      
      
    }
    
  });
  renderLayouts();
});


