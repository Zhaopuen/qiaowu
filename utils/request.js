module.exports = function Trequest(a) {
  a.data || (a.data = {});
  // if (wx.getStorageSync("user_info")) {
  //   var id = wx.getStorageSync("user_info").data || '';
  //   var sign = wx.getStorageSync("user_info").data || '';
  //   id && (a.data.user_id = id);
  //   sign && (a.data.sign = sign);
  // }
  wx.request({
    url: 'https://gongyujia.fengsh.cn/api/' + a.url,
    header: a.header || {
      "content-type": "applisation/x-www-form-urlencoded"
    },
    data: a.data || {},
    method: a.method || "post",
    dataType: a.dataType || "json",
    success: function (t) {
      a.callback(t)
    },
    fail: function (t) {
      console.warn("--- request fail >>>"), console.warn(t), console.warn("<<< request fail ---");
      var e = getApp();
      e.is_on_launch ? (e.is_on_launch = !1, wx.showModal({
        title: "网络请求出错",
        content: t.errMsg,
        showCancel: !1,
        success: function (t) {
          t.confirm && a.fail && a.fail(t);
        }
      })) : (wx.showToast({
        title: t.errMsg,
        image: "/images/icon-warning.png"
      }), a.fail && a.fail(t));
    },
    complete: function (t) {
      200 != t.statusCode && (t.data.code && 500 == t.data.code && wx.showModal({
        title: "系统错误",
        content: t.data.data.type + "\r\n事件ID:" + t.data.data.event_id,
        cancelText: "关闭",
        confirmText: "复制",
        success: function (e) {
          e.confirm && wx.setClipboardData({
            data: t.data.data.type + "\r\n事件ID:" + t.data.data.event_id + "\r\n " + a.url
          });
        }
      }), console.log("--- request http error >>>"), console.log(t.statusCode), console.log(t.data),
        console.log("<<< request http error ---")), a.complete && a.complete(t);
    }
  });
};