require("./utils/ald-stat.js");

App({
    onLaunch: function() {
        var a = wx.getStorageSync("token");
        if (a) e = a; else var e = Date.parse(new Date());
        wx.setStorageSync("session_id", e);
    },
    globalData: {
        userInfo: null,
        gyjProductBase: "https://api.gongyujia.com/",
        app_id: "0007",
        sign: "73a9627c42fc4fd2ba16e3df3e99f9c6",
        udid: "wxapp",
        version: "200",
        channel_id: "001"
    },
    globalDataJson: {
        gyjProductBase: "https://gyjapi.gongyujia.com/",
        os_type: "mini",
        os_version: 340,
        network: 110,
        version_code: 110,
        area_code: "021"
    }
});