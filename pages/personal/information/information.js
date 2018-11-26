Page({
    data: {},
    onLoad: function(e) {
        wx.getStorageSync("token") || wx.redirectTo({
            url: "/pages/login/login/login"
        });
        var o = wx.getStorageSync("mobile"), n = wx.getStorageSync("nick_name");
        this.setData({
            mobile: o,
            nick_name: n
        });
    },
    onPasswordBtn: function() {
        wx.navigateTo({
            url: "/pages/login/forget/forget"
        });
    },
    logout: function() {
        wx.removeStorageSync("user_id"), wx.removeStorageSync("token"), wx.removeStorageSync("open_id"), 
        wx.removeStorageSync("avatar"), wx.removeStorageSync("nick_name"), wx.clearStorage(), 
        wx.switchTab({
            url: "/pages/personal/personal",
            success: function(e) {
                var o = getCurrentPages().pop();
                void 0 != o && null != o && o.onLoad();
            }
        });
    }
});