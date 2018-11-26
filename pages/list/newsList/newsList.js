const Trequest = require('../../../utils/request.js')
Page({
    data: {
      newsList:[],
      page: 1,
      totalList: '',
      moreUrl: ''
    },
    onLoad: function(a) {
      var that = this;
      console.log(a, a.url,'1111')
        var t = a.url;
        that.setData({
          moreUrl: t
        })
        Trequest({
          url:t,
          data:{
            p: that.data.page
          },
          callback(res){
            that.setData({
              newsList:res.data.data,
              totalList: res.data.total
            })
          }
        })
    },
  onReachBottom: function () {
    var that = this;
    var arr1 = that.data.newsList,
      arr2 = [];
    that.setData({
      page: 1
    })
    that.data.page++;
    Trequest({
      url: that.data.moreUrl,
      data: {
        p: that.data.page
      },
      method: 'GET',
      callback(res) {
        if (that.data.newsList.length < that.data.totalList) {
          that.setData({
            newsList: arr1.concat(res.data.data),
            totalList: res.data.total
          })
          console.log(that.data.newsList, 'bbbbbbbb')
        }
      }
    })
  },
    onListDetailTap: function (e) {
      var t = e.currentTarget.dataset.id;
      console.log(t), wx.navigateTo({
        url: "../listDetail/listDetail?id=" + t
      });
    },
});