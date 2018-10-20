Component({
  relations: {
    '../tabItem/index': {
      type: 'child',
      linked: function (target) {
        target.toggleStatus(this.data.current === this.data.tabs.length)
        this.data.tabs.push({
          title: target.data.label,
          index: this.data.tabs.length
        })
        this.setData({
          tabs: this.data.tabs
        })
      },
    }
  },
  properties: {
    current: {
      type: Number,
      value: 0
    },
    activeColor: {
      type: String,
      value: '#333333'
    },
    showMenu: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    tabs: [],
    pagex: 0
  },
  methods: {
    handleTouchStart: function (e) {
      this.data.pagex = e.touches[0].pageX
    },
    handleTouchEnd: function (e) {
      if (!this.data.showMenu) return false;
      let pagex = e.changedTouches[0].pageX;
      let res = pagex - this.data.pagex;
      let left = res < 0;
      let current = this.data.current;
      if (Math.abs(res) >  150) {
        if (current === (this.data.tabs.length - 1) && left) {
          current = 0
        } else if (current <= 0 && !left) {
          current = (this.data.tabs.length - 1);
        } else {
          current = current + (left ? 1 : - 1)
        }
        this._tabclick(current);
      }
    },
    toggleTab: function (e) {
      this._tabclick(e.currentTarget.dataset.index);
    },
    _tabclick: function (index) {
      this.setData({
        current: index
      })
      let nodes = this.getRelationNodes('../tabItem/home');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].toggleStatus(index === i);
      }
      this.triggerEvent('change', { index: Number(index) });
    }
  }
})
