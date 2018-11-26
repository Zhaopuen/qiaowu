const Trequest = require('../../../utils/request.js')
Page({
  data: {
    collectList: [],
    userInfo: '',
    collectkong: false
  },
  onLoad: function () {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    that.setData({
      userInfo: userInfo.id
    })
    Trequest({
      url: 'Reservation/getlist',
      method: "GET",
      data: {
        user_id: that.data.userInfo
      },
      callback(res) {
        console.log(res.data,'这是预约的房屋列表')
        var arr = [];
        var len = res.data.data;
        for (var i = 0; i < len.length; i++) {
          arr.push(res.data.data[i]);
        }
        that.setData({
          collectList: arr,
        })
      }
    });
  },
  onListDetailTap: function (e) {
    // i.aldstat.sendEvent("首页房源点击");
    var t = e.currentTarget.dataset.id;
    console.log(e,'eeeeeeeee')
    console.log(t), wx.navigateTo({
      url: "../../list/listDetail/listDetail?id=" + t
    });
  },
})