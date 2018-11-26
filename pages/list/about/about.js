const Trequest = require('../../../utils/request.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    shequList: '',
    shequPic:'',
    shequContent:''
  },
  onLoad: function (a) {
    var that = this;
    console.log(a, a.url, '1111')
    var t = a.url;
    Trequest({
      url: t,
      data: {

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      callback(res) {
        console.log(res, '55555555')
        WxParse.wxParse('article', 'html', res.data.data[0].content, that, 5);
        that.setData({
          shequList: res.data.data[0].title,
          shequPic: res.data.data[0].pic_url,
          // shequContent: temp,
        })
      }
    })
  },
});