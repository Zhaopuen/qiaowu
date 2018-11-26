var a = getApp(), n = a.globalData.gyjProductBase + "home/user/getBanner";

Page({
    data: {
      userName:'',
      avatar:'',
      userInfo:''
    },
    onLoad: function(t) {
        var o = this, e = wx.getStorageSync("token");
        var that = this;
        // 判断是否登录
        var userInfo = wx.getStorageSync('user_info').data;
        if (!userInfo) {
          wx.redirectTo({
            url: "/pages/logins/logins?id=1"
          });
        }else{
          this.setData({
            userInfo: userInfo
          })
        }
    },
    onShow: function() {
        var a = wx.getStorageSync("user_id"), n = wx.getStorageSync("token"), t = wx.getStorageSync("nick_name"), o = wx.getStorageSync("avatar");
        console.log(t), this.setData({
            token: n,
            user_id: a,
            nick_name: t,
            avatar: o
        });
    },
    onCollectBtn: function() {
      wx.navigateTo({
        url: "/pages/personal/collect/collect"
      })
    },
    onSuggestBtn: function() {
        wx.navigateTo({
          url: "/pages/personal/address/address"
        })
    },
    onAboutBtn: function() {
        a.aldstat.sendEvent("个人中心关于点击"), wx.navigateTo({
            url: "about/about"
        });
    },
    onLoginBtn: function() {
        wx.navigateTo({
            url: "/pages/login/login/login"
        });
    },
    activeH5: function() {
        var a = this.data.link;
        wx.navigateTo({
            url: "activeH5/activeH5?link=" + a
        });
    }
});