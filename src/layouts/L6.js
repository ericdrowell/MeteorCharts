(function() {
  /**
   * L6 LAYOUT
   * +---+---+---+
   * | 0 | 1 |   |
   * +---+---+ 3 |  
   * | X | 2 |   |
   * +---+---+---+
   */
  MeteorChart.Layouts.L6 = [ 
    // slot 0
    {
      orientation: 'vertical',
      x: function() {
        return this.chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      height: function() {
        return this.chart.slots[1].get('height');
      }
    },
    // slot 1 
    {
      x: function() {
        var chart = this.chart;
        return chart.slots[0].get('width') + (chart.padding() * 2);
      },
      y: function() {
        return this.chart.padding();
      },
      width: function() {
        var chart = this.chart;
        return chart.get('width') - chart.slots[0].get('width') - chart.slots[3].get('width') - (chart.padding() * 4);
      },
      height: function() {
        var chart = this.chart,
            slots = chart.slots;

        return chart.get('height') - (chart.padding() * 3) - slots[2].get('height');
      }
    },
    // slot 2
    {
      orientation: 'horizontal',
      x: function() {
        return this.chart.slots[1].get('x');
      },
      y: function() {
        var slots = this.chart.slots;

        return this.chart.get('height') - this.get('height') - this.chart.padding();
      },
      width: function() {
        return this.chart.slots[1].get('width');
      }
    },
    // slot 3
    {
      orientation: 'vertical',
      x: function() {
        var slots = this.chart.slots;
        return this.chart.get('width') - this.get('width') - this.chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      height: function() {
        return this.chart.get('height') - (this.chart.padding() * 2);
      }
    }
  ];
})();