(function() {
  /**
   * L4_A LAYOUT
   * +-------+
   * |   0   |
   * +---+---+
   * | 1 | 2 |
   * +---+---+
   * | X | 3 |
   * +---+---+
   */
  MeteorChart.Layouts.L4_A = [ 
    // slot 0
    {
      orientation: 'horizontal',
      x: function() {
        return this.chart.get('style').padding;
      },
      y: function() {
        return this.chart.get('style').padding;
      },
      width: function() {
        return this.chart.get('width') - (this.chart.get('style').padding * 2);
      }
    },
    // slot 1
    {
      orientation: 'vertical',
      x: function() {
        return this.chart.get('style').padding;
      },
      y: function() {
        var chart = this.chart;
        return chart.slots[0].get('height') + (chart.get('style').padding * 2);
      },
      height: function() {
        return this.chart.slots[2].get('height');
      }
    },
    // slot 2 
    {
      x: function() {
        var chart = this.chart;
        return chart.slots[1].get('width') + (chart.get('style').padding * 2);
      },
      y: function() {
        var chart = this.chart;
        return chart.slots[0].get('height') + (chart.get('style').padding * 2);
      },
      width: function() {
        var chart = this.chart;
        return chart.get('width') - chart.slots[1].get('width') - (chart.get('style').padding * 3);
      },
      height: function() {
        var chart = this.chart,
            slots = chart.slots;

        return chart.get('height') - (chart.get('style').padding * 4) - slots[3].get('height') - slots[0].get('height');
      }
    },
    // slot 3
    {
      orientation: 'horizontal',
      x: function() {
        return this.chart.slots[2].get('x');
      },
      y: function() {
        var slots = this.chart.slots;

        return slots[2].get('y') + slots[2].get('height') + this.chart.get('style').padding;
      },
      width: function() {
        return this.chart.slots[2].get('width');
      }
    }
  ];
})();