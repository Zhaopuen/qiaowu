const Trequest = require('../../../utils/request.js')
Page({
  data: {
    newHOuseList:[],
    newUrl: '',
    totalList: '',
    page: 1
  },
  onLoad: function (a) {
    var that = this;
    console.log(a, a.url, '1111')
    var t = a.url;
    that.setData({
      newUrl: t
    })
    Trequest({
      url: t,
      data: {
        p: that.data.page
      },
      callback(res) {
        console.log(res, '55555555')
        that.setData({
          newHOuseList:res.data.data,
          totalList: res.data.total
        })
      }
    })
  },
  onListDetailTap: function (e) {
    var t = e.currentTarget.dataset.id;
    console.log(t), wx.navigateTo({
      url: "../listDetail/listDetail?id=" + t
    });
  },
  onReachBottom: function () {
    console.log(88888)
    var that = this;
    var arr1 = that.data.newHOuseList,
      arr2 = [];
    that.setData({
      page: 1
    })
    // if (that.data.lawAdviceList.length < that.data.totalList){
    that.data.page++;
    Trequest({
      url: that.data.newUrl,
      data: {
        p: that.data.page
      },
      method: 'GET',
      callback(res) {
        if (that.data.newHOuseList.length < that.data.totalList) {
          that.setData({
            newHOuseList: arr1.concat(res.data.data),
            totalList: res.data.total
          })
          console.log(that.data.newHOuseList, 'bbbbbbbb')
        }
      }
    })
  },
});