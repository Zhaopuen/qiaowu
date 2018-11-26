const Trequest = require('../../../utils/request.js')
var t = null, a = null, e = getApp(), i = e.globalData.gyjProductBase + "home/house/reserve_house", s = {
    data: {
        hasEmptyGrid: !1,
        showPicker: !1,
        time: '9:00',
        timeend: '11:00',
        items: [ {
            name: "上午",
            value: "5",
            checked: !0
        }, {
            name: "下午",
            value: "6"
        } ],
        userName: '',
        userPhone: "",
        startTime:'',
        endTime:''
    },
    onLoad: function(t) {
      console.log(t,'id接口接看 ')
        var a = t.id, e = new Date(), i = e.getFullYear(), s = e.getMonth() + 1, r = e.getDate(), o = [ "日", "一", "二", "三", "四", "五", "六" ];
        this.calculateEmptyGrids(i, s, r), this.calculateDays(i, s, r), this.setData({
            cur_year: i,
            cur_month: s,
            weeks_ch: o,
            cur_day: r,
            house_id: a
        });
      console.log(this.data.house_id,'houseid')
    },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeendChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timeend: e.detail.value
    })
  },
    // 在线预约
  userName: function (e) {
    this.setData({
      userName: e.detail.value,
    })
  },
  userPhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
    bespokeSubmit: function(e){
      console.log(e,"这个是eeeeeeee")
      var that = this;
      var userInfo = wx.getStorageSync('user_info').data;
      var e = that.data.cur_year,
          i = that.data.cur_month,
          day = that.data.cur_day;
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(this.data.userPhone)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'success',
          duration: 1500
        })
        return false;
      }
      Trequest({
        url: 'reservation/add',
        data: {
          user_id: userInfo.id,
          sign: userInfo.sign,
          house_id: that.data.house_id,
          name: that.data.userName,
          mobile: that.data.userPhone,
          appointment: (that.data.cur_year +'-'+ that.data.cur_month +'-'+ that.data.cur_day+' '+that.data.time +'-'+that.data.timeend)
        },
        header: {
          'content-type': 'application/json'
        },
        callback(res) {
          console.log(res.data, '这是预约');
          if(res.data.msg == "添加成功"){
            wx.showToast({
              title: '预约成功！',
            })
            wx.navigateBack({
              url:'pages/list/listDetail/listDetail'
            })
          }
          var arr = [];
          var len = res.data;
          for (var i = 0; i < len.length; i++) {
            console.log(len.length)
            arr.push(res.data[i]);
          }
          that.setData({
            swiperTab: arr
          })
        }
      });
    },
    getThisMonthDays: function(t, a) {
        return new Date(t, a, 0).getDate();
    },
    getFirstDayOfWeek: function(t, a) {
        return new Date(Date.UTC(t, a - 1, 1)).getDay();
    },
    calculateEmptyGrids: function(t, a) {
        var e = this.getFirstDayOfWeek(t, a), i = [];
        if (e > 0) {
            for (var s = 0; s < e; s++) i.push(s);
            this.setData({
                hasEmptyGrid: !0,
                empytGrids: i
            });
        } else this.setData({
            hasEmptyGrid: !1,
            empytGrids: []
        });
    },
    calculateDays: function(t, a, e) {
        var i = [], s = this.getThisMonthDays(t, a), r = new Date();
        if (!e) var e = r.getDate();
        for (var o = r.getFullYear(), n = r.getMonth() + 1, l = 1; l <= s; l++) {
            if (l <= e && t == o && n == a) c = !0; else var c = !1;
            i.push({
                day: l,
                choosed: !1,
                gray: c
            });
        }
        this.setData({
            days: i
        });
    },
    handleCalendar: function(t) {
        var a = t.currentTarget.dataset.handle, e = this.data.cur_year, i = this.data.cur_month;
        if ("prev" === a) {
            var s = i - 1, r = e;
            s < 1 && (r = e - 1, s = 12), this.calculateDays(r, s), this.calculateEmptyGrids(r, s),            console.log(r,s,'这是日期')
            this.setData({
                cur_year: r,
                cur_month: s
            });
        } else {
            var o = i + 1, n = e;
            o > 12 && (n = e + 1, o = 1), this.calculateDays(n, o), this.calculateEmptyGrids(n, o), 
            this.setData({
                cur_year: n,
                cur_month: o
            });
        }
    },
    tapDayItem: function(t, a, e, i) {
        var s = t.target.id, r = new Date().getDate(), o = this.data.days, a = s;
        if (s <= r) return !1;
        for (var n = this.getThisMonthDays(this.data.cur_year, this.data.cur_month), l = 1; l <= n; l++) if (l == s) {
            o[s - 1].choosed = !0;
            var c = this.data.cur_year + "-" + this.data.cur_month + "-" + s;
        } else o[l - 1].choosed = !1;
        this.setData({
            days: o,
            cur_day: a,
            select_date: c
        });
    },
    chooseYearAndMonth: function() {
        for (var t = this.data.cur_year, a = this.data.cur_month, e = [], i = [], s = 2017; s <= 2100; s++) e.push(s);
        for (var r = 1; r <= 12; r++) i.push(r);
        var o = e.indexOf(t), n = i.indexOf(a);
        this.setData({
            picker_value: [ o, n ],
            picker_year: e,
            picker_month: i,
            showPicker: !0
        });
    },
    pickerChange: function(e) {
        var i = e.detail.value;
        t = this.data.picker_year[i[0]], a = this.data.picker_month[i[1]];
    },
    tapPickerBtn: function(e) {
        var i = {
            showPicker: !1
        };
        "confirm" === e.currentTarget.dataset.type && (i.cur_year = t, i.cur_month = a, 
        this.calculateEmptyGrids(t, a), this.calculateDays(t, a)), this.setData(i);
    },
    onShareAppMessage: function() {
        return {
            title: "",
            desc: "",
            path: ""
        };
    },
    radioChange: function(t) {
        this.setData({
            time_type: t.detail.value
        });
    },
    formSubmit: function(t) {
        e.aldstat.sendEvent("在线预约");
        var a = t.detail.value.mobile, s = t.detail.value.house_id, r = t.detail.value.real_name, o = t.detail.value.time_type, n = t.detail.value.select_date;
        return console.log(a + "--" + r + "--" + o + "--" + n), res = this.validatemobile(a), 
        0 != res && ("" == r ? (wx.showToast({
            title: "请输入您的姓名！",
            icon: "loading",
            duration: 1500
        }), !1) : "" == n ? (wx.showToast({
            title: "请选择看房日期！",
            icon: "loading",
            duration: 1500
        }), !1) : void wx.request({
            url: i,
            data: {
                app_id: e.globalData.app_id,
                channel_id: e.globalData.channel_id,
                sign: e.globalData.sign,
                udid: e.globalData.udid,
                version: e.globalData.version,
                mobile: a,
                real_name: r,
                house_id: s,
                select_date: n,
                time_type: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.showToast({
                    title: "预约成功",
                    icon: "loading",
                    duration: 1500
                });
            }
        }));
    },
    goto: function(t) {
        wx.redirectTo({
            url: "/page/list/listDetail/listDetail?id=" + t
        });
    },
    validatemobile: function(t) {
        return 0 == t.length ? (wx.showToast({
            title: "请输入手机号！",
            icon: "loading",
            duration: 1500
        }), !1) : 11 != t.length ? (wx.showToast({
            title: "手机格式有误！",
            icon: "loading",
            duration: 1500
        }), !1) : !!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(t) || (wx.showToast({
            title: "手机号有误！",
            icon: "loading",
            duration: 1500
        }), !1);
    }
};

Page(s);