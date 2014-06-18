(function() {
  /**
   * L4_D LAYOUT
   * +---+---+
   * | 0 | 1 |
   * +---+---+
   * | X | 2 |
   * +---+---+
   * |   3   |
   * +-------+
   */
  MeteorChart.Layouts.L4_D = [ 
    // slot 0
    {
      orientation: 'vertical',
      x: function() {
        return this.chart.get('style').padding;
      },
      y: function() {
        var chart = this.chart;
        return chart.get('style').padding;
      },
      height: function() {
        return this.chart.slots[1].get('height');
      }
    },
    // slot 1 
    {
      x: function() {
        var chart = this.chart;
        return chart.slots[0].get('width') + (chart.get('style').padding * 2);
      },
      y: function() {
        var chart = this.chart;
        return chart.get('style').padding;
      },
      width: function() {
        var chart = this.chart;
        return chart.get('width') - chart.slots[0].get('width') - (chart.get('style').padding * 3);
      },
      height: function() {
        var chart = this.chart,
            slots = chart.slots;

        return chart.get('height') - (chart.get('style').padding * 4) - slots[2].get('height') - slots[3].get('height');
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

        return slots[1].get('y') + slots[1].get('height') + this.chart.get('style').padding;
      },
      width: function() {
        return this.chart.slots[1].get('width');
      }
    },
    // slot 3
    {
      orientation: 'horizontal',
      x: function() {
        return this.chart.get('style').padding;
      },
      y: function() {
        var slots = this.chart.slots;
        return slots[2].get('y') + slots[2].get('height') + this.chart.get('style').padding;
      },
      width: function() {
        return this.chart.get('width') - (this.chart.get('style').padding * 2);
      }
    }
  ];
})();