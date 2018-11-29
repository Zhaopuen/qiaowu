const Trequest = require('../../utils/request.js')
Page({
  data: {
    page: '',
    back: ''
  },
  onLoad: function (option) {
    this.setData({
      back: option.id
    })
    // console.log(e,'这是we')
    // this.setData({
    //   pageAs: e.pageAs
    // })
    // console.log(e.pageAs, 'pageAs');
  },
  getUserInfo: function (t) {
    var that = this;
    wx.login({
      success: function (o) {
        console.log(o, 'wx.login')
        var n = o.code;
        wx.request({
          url: 'https://www.qiaowugongyu.com/api/user/wechatLoginMiniProgram',
          method: "POST",
          data: {
            code: n,
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv,
            headimgurl: t.detail.userInfo.avatarUrl,
            nickname: t.detail.userInfo.nickName
          },
          success: function (e) {
            console.log('e', e)
            if (200 == e.statusCode) {
              wx.setStorageSync("access_token", e.data.access_token), wx.setStorageSync("user_info", e.data);
              if (that.data.back == 1) {
                wx.switchTab({
                  url: "/pages/personal/personal"
                });
              }
              else if (that.data.back == 'mine') {
                wx.switchTab({
                  url: "/pages/mine/mine"
                });
              }
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        });
      },
      fail: function (e) {

      }
    });
  }
});