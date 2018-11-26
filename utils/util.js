module.exports = {
    convertToStarsArray: function(t) {
        for (var n = t.toString().substring(0, 1), o = [], a = 1; a <= 5; a++) a <= n ? o.push(1) : o.push(0);
        return o;
    },
    http: function(t, n) {
        wx.request({
            url: t,
            data: {
                app_id: "0001",
                channel_id: "0",
                device: "3",
                p: "0",
                sign: "0a475c42fc0505709113968aa7ba9051",
                status: "1",
                token: "9ee0813102472cb27b9b238dbb39ba76",
                udid: "AE67F78E-A9F6-4C2E-9583-90D0CDBCF280",
                version: "203"
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                n(t.data);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    convertToCastString: function(t) {
        var n = "";
        for (var o in t) n = n + t[o].name + " / ";
        return n.substring(0, n.length - 2);
    },
    convertToCastInfos: function(t) {
        var n = [];
        for (var o in t) {
            var a = {
                img: t[o].avatars ? t[o].avatars.large : "",
                name: t[o].name
            };
            n.push(a);
        }
        return n;
    },
    validatemobile: function(t) {
        return 0 == t.length ? (console.log("qqqqqqqqqqqqqqqq"), wx.showToast({
            title: "请输入手机号！",
            icon: "loading",
            duration: 1500
        }), !1) : 11 != t.length ? (wx.showToast({
            title: "手机号长度有误！",
            icon: "loading",
            duration: 1500
        }), !1) : !!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(t) || (wx.showToast({
            title: "手机号有误！",
            icon: "loading",
            duration: 1500
        }), !1);
    }
};