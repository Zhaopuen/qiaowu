const Trequest = require('../../../utils/request.js')
Page({
  data:{
    collectList: [],
    userInfo:'',
    collectkong:false,
    totalList: "",
    page: 1
  },
  onLoad: function(){
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    that.setData({
      userInfo:userInfo.id
    })
    Trequest({
      url: 'Collection/getlist',
      method: "GET",
      data: {
        user_id: that.data.userInfo
      },
      callback(res) {
        
        Trequest({
          url:'house/getlist',
          method: "GET",
          data:{
            id: res.data.data[0].collection_ids,
            user_id: that.data.userInfo,
            p: that.data.page
          },
          callback(res){
            if(res.data.data == ""){
              that.setData({
                collectkong : true
              })
            }
            var arr = [];
            var len = res.data.data;
            for (var i = 0; i < len.length; i++) {
              arr.push(res.data.data[i]);
            }
            that.setData({
              collectList: arr,
              totalList: res.data.total
            })
          }
        })
      }
    });
  },

  onReachBottom: function () {
    var userInfo = wx.getStorageSync('user_info').data;
    var that = this;
    var arr1 = that.data.collectList,
      arr2 = [];
    that.setData({
      page: 1
    })
    that.data.page++;
    Trequest({
      url: 'Collection/getlist',
      method: "GET",
      data: {
        user_id: that.data.userInfo
      },
      callback(res) {

        Trequest({
          url: 'house/getlist',
          method: "GET",
          data: {
            id: res.data.data[0].collection_ids,
            user_id: that.data.userInfo,
            p: that.data.page
          },
          callback(res) {
            if (that.data.collectList.length < that.data.totalList) {
              that.setData({
                collectList: arr1.concat(res.data.data),
                totalList: res.data.total
              })
              console.log(that.data.collectList, 'bbbbbbbb')
            // if (res.data.data == "") {
            //   that.setData({
            //     collectkong: true
            //   })
            // }
            // var arr = [];
            // var len = res.data.data;
            // for (var i = 0; i < len.length; i++) {
            //   arr.push(res.data.data[i]);
            // }
            // that.setData({
            //   collectList: arr,
            //   totalList: res.data.total
            // })
          }
          }
        })
      }
    });
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
    // i.aldstat.sendEvent("首页房源点击");
    var t = e.currentTarget.dataset.id;
    console.log(t), wx.navigateTo({
      url: "../../list/listDetail/listDetail?id=" + t
    });
  },
})