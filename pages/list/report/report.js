var a = getApp(), o = a.globalData.gyjProductBase + "home/house/report";

Page({
    data: {},
    onLoad: function(a) {
        var o = a.id;
        if (!wx.getStorageSync("token")) {
            var t = encodeURIComponent("/pages/list/listDetail/listDetail?id=" + o);
            wx.navigateTo({
                url: "/pages/login/login/login?url=" + t
            });
        }
    },
    formSubmit: function(t, e) {
        var i = t.detail.value.reason, n = wx.getStorageSync("token"), l = t.detail.value.msg;
        return 0 == i.length ? (wx.showToast({
            title: "理由不能为空！",
            icon: "loading",
            duration: 1500
        }), !1) : "" == l ? (wx.showToast({
            title: "请填写详细描述！",
            icon: "loading",
            duration: 1500
        }), !1) : void wx.request({
            url: o,
            data: {
                app_id: a.globalData.app_id,
                channel_id: a.globalData.channel_id,
                sign: a.globalData.sign,
                udid: a.globalData.udid,
                version: a.globalData.version,
                house_id: e,
                reason: i,
                token: n,
                msg: l
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                200 == a.data.code ? wx.showToast({
                    title: "举报成功！",
                    icon: "loading",
                    duration: 1500
                }) : wx.showToast({
                    title: a.data.msg,
                    icon: "loading",
                    duration: 1500
                });
            }
        });
    }
});