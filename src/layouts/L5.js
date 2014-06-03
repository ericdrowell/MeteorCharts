(function() {
  /**
   * L5 LAYOUT
   * +-------+
   * |   0   |
   * +---+---+
   * | 1 | 2 |
   * +---+---+
   * | X | 3 |
   * +---+---+
   */
  MeteorChart.Layouts.L5 = [ 
    // slot 0
    {
      id: 'title',
      type: 'Title',
      x: function() {
        return this.chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      width: function() {
        return this.chart.get('width') - (this.chart.padding() * 2);
      }
    },
    // slot 1
    {
      x: function() {
        return this.chart.padding();
      },
      y: function() {
        var chart = this.chart;
        return chart.slots[0].get('height') + (chart.padding() * 2);
      },
      height: function() {
        return this.chart.slots[2].get('height');
      }
    },
    // slot 2 
    {
      x: function() {
        var chart = this.chart;
        return chart.slots[1].get('width') + (chart.padding() * 2);
      },
      y: function() {
        var chart = this.chart;
        return chart.slots[0].get('height') + (chart.padding() * 2);
      },
      width: function() {
        var chart = this.chart;
        return chart.get('width') - chart.slots[1].get('width') - (chart.padding() * 3);
      },
      height: function() {
        var chart = this.chart,
            slots = chart.slots;

        return chart.get('height') - (chart.padding() * 4) - slots[3].get('height') - slots[0].get('height');
      }
    },
    // slot 3
    {
      x: function() {
        return this.chart.slots[2].get('x');
      },
      y: function() {
        var slots = this.chart.slots;

        return slots[2].get('y') + slots[2].get('height') + this.chart.padding();
      },
      width: function() {
        return this.chart.slots[2].get('width');
      }
    }
  ];
})();