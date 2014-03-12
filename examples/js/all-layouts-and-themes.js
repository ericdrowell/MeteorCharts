      var config = {
        container: 'container',
        width: 445,
        height: 250,
        padding: 20,
        theme: MeteorChart.Themes.CoteAzur,
        //theme: MeteorChart.Themes.Lollapalooza,

        data: {
          title: 'Awesome Blossom Possum',
          line: {
            unit: {
              x: 'Number',
              y: 'Number'
            },
            series: [
              {
                // red
                title: 'Series 1',
                points: [
                  -100, -100,
                  100, 100,
                  200, 50
                ]
              },
              { 
                // green
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
        layout: MeteorChart.Layouts.StandardLineChartWithHorizontalLines,
        interaction: MeteorChart.Interactions.LineChartTooltip,
        options: {
          xAxis: {
            maxIncrements: 5
          },
          yAxis: {
            maxIncrements: 5
          }
        }
      };

      var themes = ['CoteAzur', 'Lollapalooza', 'CherryCheescake', 'Firenze', 'HiCharts', 'LinkedIn', 'Kistler'];

      for (var n =0; n<themes.length; n++) {
        var theme = themes[n];
        var themeContainer = document.createElement('div');
        themeContainer.className = 'theme';
        document.getElementById('themesAndLayoutsContainer').appendChild(themeContainer);

        var themeName = document.createElement('h2');
        themeName.innerHTML = theme;
        themeContainer.appendChild(themeName);

        for (var layout in MeteorChart.Layouts) {
          var container = document.createElement('div');
          container.className = 'layout';
          themeContainer.appendChild(container);

          config.container = container;
          config.layout = MeteorChart.Layouts[layout];
          config.theme = MeteorChart.Themes[theme];
          new MeteorChart(config);
        }
      }