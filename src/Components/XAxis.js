(function() {
	var MAX_NUMBER_OF_X_LABELS = 7,
	    SECONDS_IN_YEAR = 31536000,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60,
      GRANULARITY_TO_SECONDS = [
        SECONDS_IN_YEAR, 
        SECONDS_IN_MONTH, 
        SECONDS_IN_DAY, 
        SECONDS_IN_HOUR, 
        SECONDS_IN_MINUTE
      ],
      GRANULARITIES = {
        YEAR: 0,
        MONTH: 1,
        DAY: 2,
        HOUR: 3,
        MINUTE: 4,
        SECOND: 5 
      };

  Meteor.XAxis = function(chart) {
    this.chart = chart;
    this.setGranularity();
    this.addXLabels();
  };

  Meteor.XAxis.prototype = {
    setGranularity: function() {
      var chart = this.chart,
          maxX = chart.maxX,
          minX = chart.minX,
          range = (maxX - minX) / 1000,
          smallestIncrement = range / MAX_NUMBER_OF_X_LABELS,
          granularity = GRANULARITIES.SECOND;

      if (smallestIncrement > SECONDS_IN_MINUTE) {
        granularity = GRANULARITIES.MINUTE;
      }
      if (smallestIncrement > SECONDS_IN_HOUR) {
        granularity = GRANULARITIES.HOUR;
      }
      if (smallestIncrement > SECONDS_IN_DAY) {
        granularity = GRANULARITIES.DAY;
      }
      if (smallestIncrement > SECONDS_IN_MONTH) {
        granularity = GRANULARITIES.MONTH;
      }
      if (smallestIncrement > SECONDS_IN_YEAR) {
        granularity = GRANULARITIES.YEAR;
      }

      this.granularity = granularity;
    },
    addXLabels: function() {
      var chart = this.chart,
          maxX = chart.maxX,
          minX = chart.minX,
          range = (maxX - minX) / 1000,
          granularity = chart.granularity,
          nearest = GRANULARITY_TO_SECONDS[granularity],
          smallestIncrement = Math.round(range / MAX_NUMBER_OF_X_LABELS / nearest) * nearest,
          n;

      for (n=minX; n<maxX; n+=(smallestIncrement*1000)) {
        this.addXLabel(this.getFormattedShortDate(new Date(n), granularity), (n - minX) * scaleX);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          layout = chart.layout,
          y = layout.height - 16,
          skin = chart.skin,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          label = new Kinetic.Label({
            x: x,
            y: y
          });

      label.add(tag).add(text);
      chart.topLabelLayer.add(label);
    },
    getFormattedShortDate: function(date, granularity) {
      switch(granularity) {
        case 0: return date.format('yyyy'); // year
        case 1: return date.format('yy mmm');  // month
        case 2: return date.format('mmm dd'); // day
        case 3: return date.format('ddd htt'); // hours
        case 4: return date.format('h:MMtt'); // minute
        default: return date.format('MM:sstt'); // seconds
      }
    }
  };
})();