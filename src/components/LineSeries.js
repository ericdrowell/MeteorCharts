(function() {

  // else {
  //   init = function() {
  //     this.canvas = document.createElement('canvas');
  //     this.context = this.canvas.getContext('2d');

  //     // add canvas to the content container
  //     this.content.appendChild(this.canvas);

  //     this._bind();
  //   };

  //   render = function() {
  //     var data = this.data(),
  //         series = data.series,
  //         unit = data.unit || {},
  //         len = series.length,
  //         context = this.context,
  //         n, line, points, i, pointsLen, viewport;

  //     //MeteorChart.log('render ' + this.id)

  //     // recalculate range and scale
  //     viewport = this.getSeriesMinMax(series);
  //     this.minX = viewport.minX;
  //     this.minY = viewport.minY;
  //     this.maxX = viewport.maxX;
  //     this.maxY = viewport.maxY;
  //     this._setScale();

  //     // update formatters
  //     this.formatterX = new MeteorChart.Formatters[unit.x || 'Number'](this.minX, this.minY);
  //     this.formatterY = new MeteorChart.Formatters[unit.y || 'Number'](this.maxX, this.maxY);

  //     // render
  //     context.clearRect(0, 0, this.width(), this.height());
  //     this.canvas.width = this.width();
  //     this.canvas.height = this.height();
      
  //     for (n=0; n<len; n++) {
  //       points = series[n].points;
  //       pointsLen = points.length;

  //       context.save();
  //       context.translate(0, this.height());
  //       context.scale(this.scaleX, this.scaleY * -1);
  //       context.translate(this.minX * -1, this.minY * -1);
  //       context.beginPath();
  //       context.moveTo(points[0], points[1]);

  //       for (i = 2; i<pointsLen; i+=2) {
  //         context.lineTo(points[i], points[i+1]);
  //       }

  //       context.restore();
  //       context.strokeStyle = MeteorChart.Color.getDataColor(this.chart.theme.data, n);
  //       context.lineWidth = 2;
  //       context.stroke();
  //     } 
  //   };
  // }


  MeteorChart.Component.extend('LineSeries', {
    init: function() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        // NOTE: when antialias is turned on, the lines are disjointed
        antialias: true
      });
      this.content.appendChild(this.renderer.domElement);

      

    },
    preRender: function() {
      var data = this.data(),
          style = this.style(),
          width = this.width(),
          height = this.height(),
          series = data.series,
          unit = data.unit || {},
          len = series.length,
          context = this.context,
          n, line, points, i, pointsLen, viewport;

      this.lines = [];

      //MeteorChart.log('render ' + this.id)

      // recalculate range and scale
      viewport = this.getSeriesMinMax(series);
      this.minX = viewport.minX;
      this.minY = viewport.minY;
      this.maxX = viewport.maxX;
      this.maxY = viewport.maxY;
      this._setScale();

      // update formatters
      this.formatterX = new MeteorChart.Formatters[unit.x || 'Number'](this.minX, this.minY);
      this.formatterY = new MeteorChart.Formatters[unit.y || 'Number'](this.maxX, this.maxY);

      this.renderer.setSize(width, height);

      this.camera = new THREE.OrthographicCamera(0, width, height / 2, height / - 2, 1, 1000 );
      this.camera.position.set(0, 0, 300);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene = new THREE.Scene();

      


      for (n=0; n<len; n++) {

        points = series[n].points;
        pointsLen = points.length;


        var material = new THREE.LineBasicMaterial({
              color: MeteorChart.Color.getDataColor(this.chart.theme.data, n),
              linewidth: 2
          });

        var geometry = new THREE.Geometry();
          // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
          // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
          // geometry.vertices.push(new THREE.Vector3(10, 0, 0));

        for (i = 0; i<pointsLen; i+=2) {
          geometry.vertices.push(new THREE.Vector3(points[i], points[i+1], 0));
        }

            var line = new THREE.Line(geometry, material);

         this.scene.add(line);

         this.lines.push(line);

        // geometry.computeBoundingBox();

        // width = geometry.boundingBox.max.x - geometry.boundingBox.min.x
        // height = geometry.boundingBox.max.y - geometry.boundingBox.min.y 

        // console.log(width);
        // console.log(height)

        //line.scale.set(this.scaleX * data.zoomX, this.scaleY * data.zoomY, 1);

      } 



      this.renderer.render(this.scene, this.camera);  
    },
    render: function() {
      var data = this.data(),
          lines = this.lines,
          len = lines.length,
          n;


      for (n=0; n<len; n++) {


        lines[n].scale.set(this.scaleX * data.zoomX, this.scaleY * data.zoomY, 1);

      } 



      this.renderer.render(this.scene, this.camera);   
    },
    getPointsMinMax: function(points) {
      var minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = points.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        point = points[n];
        x = points[n];
        y = points[n+1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    getSeriesMinMax: function(series) {
      var minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = series.length,
          n, viewport;

      for (n=0; n<len; n++) {
        viewport = this.getPointsMinMax(series[n].points);
        minX = Math.min(minX, viewport.minX);
        minY = Math.min(minY, viewport.minY);
        maxX = Math.max(maxX, viewport.maxX);
        maxY = Math.max(maxY, viewport.maxY);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    dataToChartX: function(x) {
      return (x - this.minX) * this.scaleX;
    },
    dataToChartY: function(y) {
      return this.height() - ((y - this.minY) * this.scaleY);
    },
    dataToChart: function(x, y) {
      return {
        x: this.dataToChartX(x),
        y: this.dataToChartY(y)
      }; 
    },
    chartToDataX: function(x) {
      return (x / this.scaleX) + this.minX;
    },
    chartToDataY:function(y) {
      return this.minY - ((y - this.height()) / this.scaleY);
    },
    chartToData: function(x, y) {
      return {
        x: this.chartToDataX(x),
        y: this.chartToDataY(y)
      };
    },
    getSeriesNearestPointX: function(n, x) {
      var dataX = this.chartToDataX(x),
          data = this.data(),
          series = data.series,
          shortestDistance = Infinity,
          nearestPoint = null,
          i, ser, points, point, pointsLen, title, chartDistance;

      ser = series[n];
      points = ser.points;
      title = ser.title;
      pointsLen = points.length;

      for (i=0; i<pointsLen; i+=2) {
        point = {
          x: points[i], 
          y: points[i+1]
        };

        chartDistance = Math.abs(dataX - point.x);

        if (chartDistance < shortestDistance) {
          nearestPoint = {
            dataX: point.x,
            dataY: point.y,
            title: title
          };

          shortestDistance = chartDistance;

        }
      }

      // decorate
      if (nearestPoint) {
        nearestPoint.x = this.dataToChartX(nearestPoint.dataX),
        nearestPoint.y = this.dataToChartY(nearestPoint.dataY)
      }

      return nearestPoint;
    },
    getNearestPoint: function(x, y) {
      var dataPos = this.chartToData(x, y),
          data = this.data(),
          series = data.series,
          len = series.length,
          shortestDistance = Infinity,
          nearestPoint = null,
          squaredDistanceBetweenPoints = MeteorChart.Util.squaredDistanceBetweenPoints,
          n, i, ser, points, point, pointsLen, title, chartDistance;
   
      for (n=0; n<len; n++) {
        ser = series[n];
        points = ser.points;
        title = ser.title;
        pointsLen = points.length;

        for (i=0; i<pointsLen; i+=2) {
          point = {
            x: points[i], 
            y: points[i+1]
          };

          chartDistance = squaredDistanceBetweenPoints(point, dataPos);

          if (chartDistance < shortestDistance) {
            nearestPoint = {
              dataX: point.x,
              dataY: point.y,
              title: title
            }

            shortestDistance = chartDistance;
          }
        }
      }

      // decorate
      if (nearestPoint) {
        nearestPoint.x = this.dataToChartX(nearestPoint.dataX),
        nearestPoint.y = this.dataToChartY(nearestPoint.dataY)
      }

      // don't return nearest point if too far away
      // if (nearestPoint) {
      //   if (squaredDistanceBetweenPoints(nearestPoint, dataPos) > 50*50) {
      //     nearestPoint = null;
      //   }
      // }

      return nearestPoint;
    },
    _bind: function() {
      var that = this,
          content = this.content,
          contentPos;

      content.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        contentPos = MeteorChart.Dom.getElementPosition(content);

        that.fire('mousemove', {
          x: evt.clientX - contentPos.x,
          y: evt.clientY - contentPos.y
        });
      }, 17));

      content.addEventListener('mouseout', function(evt) {
        that.fire('mouseout');
      });
    },
    _setScale: function() {
      var x = this.x(),
          y = this.y(),
          width = this.width(),
          height = this.height(),
          minX = this.minX,
          maxX = this.maxX,
          minY = this.minY,
          maxY = this.maxY,
          diffX = maxX - minX,
          diffY = maxY - minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      this.scaleX = scaleX;
      this.scaleY = scaleY;
    }
  });
})();