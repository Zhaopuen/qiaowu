const Trequest = require('../../../utils/request.js')
var t = getApp(), a = t.globalData.gyjProductBase + "home/house/detail200", e = t.globalData.gyjProductBase + "home/user/collectAdd", o = t.globalData.gyjProductBase + "home/user/collectCancel";

wx.getStorageSync("token");

Page({
    data: {
        listImg: [],
        list: [],
        listSwiperDetail: [],
        listCommission: [],
        hiddenList: !1,
        show01: !1,
        show02: !0,
        indexNum: "1",
        autoplay: !1,
        listDetail: "",  //标题
        update:'',       //更新日期
        price:'',        //价格
        floor:'',        //几层
        allFloor: '',     //总共几层
        room:'',         //室
        hall:'',         //厅
        guard:'',        //卫
        inDate:'',        //最早入住日期
        adress:'',        //地址
        loadline:'',      //推荐路线
        tips: '',        //看房小贴士
        housetedian:[],   //房屋特征
        area:'',        //面积
        rtId:'',         //起租
        listDetailImg: [],   //详情轮播
        cId: '',
        user_id:'',
        room_type: null,         //房屋判断
        collectionIcon: true,
        collectionIconH: false,
        goodHouse: [],        //好屋推荐
        mobile: "",          //预约电话
        houseid: ''
    },
    onLoad: function(t) {
        console.log(t.id,'这是详情的id')
        var e = t.id;
        var that = this;
        var userInfo = wx.getStorageSync('user_info').data;
        if (userInfo){
          var userInfoId = wx.getStorageSync('user_info').data.id;
          var userInfoSign = wx.getStorageSync('user_info').data.sign;
        }
        this.setData({
          cId:e,
        })
        
        Trequest({
          url: 'house/getlist',
          data: {
            id:e,
            user_id: userInfoId ? userInfoId : "",
            sign: userInfoSign ? userInfoSign : ""
          },
          header: {
            'content-type': 'application/json'
          },
          callback(res) {
            var len = res.data.data[0];
            console.log(res.data.data,'这个大唐进货价')
            var arr = [];
            var arrPics = [];
            if (res.data.data[0].is_collection == 1){
              that.setData({
                collectionIcon: false
              })
            } else if (res.data.data[0].is_collection == 0){
              that.setData({
                collectionIcon: true
              })
            }
            for (var i = 0; i < len.ht_id_text.length;i++){
              arr.push(res.data.data[0].ht_id_text[i]);
            }
            for(var j = 0;j<len.pics.length;j++){
              arrPics.push(res.data.data[0].pics[j])
            }
            that.setData({
              listDetail: len.title,
              update: len.update_time,
              price: len.commission,
              floor: len.level,
              allFloor: len.floors,
              room: len.room,
              hall: len.hall,
              guard: len.guard,
              inDate: len.check_in,
              adress: len.address,
              loadline: len.introduction,
              tips: len.description,
              housetedian: len.housetedian,
              area: len.area,
              rtId: len.rt_id_text.title,
              housetedian:arr,
              listDetailImg: arrPics,
              room_type: len.room_type,
              mobile: len.mible,
              houseid: len.id
            })
          }
        });

      // 好屋推荐
      Trequest({
        url: 'house/getlist',
        data: {
          is_tuijian: 1
        },
        callback(res) {
          console.log(res.data, '这是详情的好屋推荐')
          var arrgood = [];
          var len = res.data.data;
          for (var i = 0; i < len.length; i++) {
            arrgood.push(res.data.data[i]);
          }
          that.setData({
            goodHouse: arrgood,
          })
        }
      })
        // this.onHouseDetail(a, e);
        var o = wx.getStorageSync("user_id"), n = wx.getStorageSync("token"), i = wx.getStorageSync("nick_name"), s = wx.getStorageSync("avatar"), l = wx.getStorageSync("is_landlord");
        o && n && this.setData({
            token: n,
            user_id: o,
            nick_name: i,
            avatar: s,
            is_landlord: l
        }), this.imageLoad();
    },
    // 支付
    pay:function(){
      var that = this;
      var userInfo = wx.getStorageSync('user_info').data;
      if (!userInfo) {
        wx.redirectTo({
          url: "/pages/logins/logins?id=1"
        });
      } else {
        Trequest({
          url: 'tradelist/add',
          data: {
            user_id: userInfo.id,
            sign: userInfo.sign,
            id: 1,
            type: 1,
            price: that.data.price
          },
          callback(res) {
            console.log(res, res.data.data,'这是支付的data');
            wx.requestPayment({
              timeStamp: "res.data.data.timestamp",
              nonceStr: res.data.data.noncestr,
              package: res.data.data.package,
              signType: 'MD5',
              paySign: res.data.data.sign,
              success: function (res) {
                wx.showToast({
                  title: "支付成功",
                  icon: "success"
                });
              }
            });
          }
        });
      }
      
    },
    // 电话预约
    makephone: function(){
      console.log(this.data.mobile,'这是phone22222')
      wx.makePhoneCall({
        phoneNumber: this.data.mobile //Used as an example only, it is not a real phone number
      })
    },
    // 回到首页
    gotoHome: function(){
      wx.switchTab({
        url: "../list",
      })
    },
    // 收藏
    collection: function(t){
      var that = this;
      var userInfo = wx.getStorageSync('user_info').data;
      if (!userInfo) {
        wx.redirectTo({
          url: "/pages/logins/logins?id=1"
        });
      } else {
        Trequest({
          url: 'Collection/add',
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          data: {
            user_id: userInfo.id,
            sign: userInfo.sign,
            collection_id: that.data.cId
          },
          callback(res) {
            if(res.data.msg == "收藏成功"){
              that.setData({
                collectionIcon: false
              })
               wx.showToast({
                 title: '收藏成功',
               })
            }else if(res.data.msg == "取消收藏"){
              that.setData({
                collectionIcon: true
              })
              wx.showToast({
                title: '您取消了收藏',
              })
            }
            console.log(res.data, '这是收藏的')
          }
        });
      }
      
    },
    onPersonalBtn: function() {
        t.aldstat.sendEvent("详情页收藏点击");
        var a = wx.getStorageSync("token"), n = this.data.postid, i = this.data.is_collect;
        if (a) 1 == i ? (this.onCollectC(o), this.setData({
            collected: !1,
            is_collect: 2
        })) : (this.onCollect(e), this.setData({
            collected: !0,
            is_collect: 1
        })); else {
            var s = encodeURIComponent("/pages/list/listDetail/listDetail?id=" + n);
            // wx.navigateTo({
            //     url: "/pages/login/login/login?url=" + s
            // });
        }
    },
    getPostsCollectedAsy: function() {
        var t = this;
        wx.getStorage({
            key: "posts_collected",
            success: function(a) {
                var e = a.data, o = e[t.data.currentPostId];
                o = !o, e[t.data.currentPostId] = o, t.showToast(e, o);
            }
        });
    },
    showToast: function(t, a) {
        wx.setStorageSync("posts_collected", t), this.setData({
            collected: a
        }), wx.showToast({
            title: a ? "收藏成功" : "取消收藏",
            duration: 1e3,
            icon: "success"
        });
    },
    onCollect: function(a, e) {
        var o = this;
        if (!e) var e = this.data.postid;
        var n = wx.getStorageSync("token");
        wx.request({
            url: a,
            data: {
                app_id: t.globalData.app_id,
                channel_id: t.globalData.channel_id,
                sign: t.globalData.sign,
                udid: t.globalData.udid,
                version: t.globalData.version,
                type_id: e,
                token: n,
                type: 1
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.code;
                o.setData({
                    codeId: a
                }), wx.showToast({
                    title: "收藏成功",
                    duration: 1e3,
                    icon: "success"
                });
            },
            fail: function(t) {}
        });
    },
    onCollectC: function(a, e) {
        var o = this;
        if (!e) var e = this.data.postid;
        var n = wx.getStorageSync("token");
        wx.request({
            url: a,
            data: {
                app_id: t.globalData.app_id,
                channel_id: t.globalData.channel_id,
                sign: t.globalData.sign,
                udid: t.globalData.udid,
                version: t.globalData.version,
                type_id: e,
                token: n,
                type: 1
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.code;
                o.setData({
                    codeId: a
                }), wx.showToast({
                    title: "取消收藏成功",
                    duration: 1e3,
                    icon: "success"
                });
            },
            fail: function(t) {}
        });
    },

    previewImage: function(a) {
        t.aldstat.sendEvent("详情页海报点击");
        a.currentTarget.dataset.id;
        var e = this.data.listImg;
        wx.previewImage({
            urls: e
        });
    },
    onListDetailTap: function(a) {
        t.aldstat.sendEvent("详情页推荐房源点击");
        var e = a.target.id;
        wx.navigateTo({
            url: "listDetail?id=" + e
        });
    },
    onReportTap: function(t) {
        var a = wx.getStorageSync("token"), e = this.data.postid;
        if (a) wx.navigateTo({
            url: "/pages/list/report/report?id=" + e
        }); else {
            var o = encodeURIComponent("/pages/list/listDetail/listDetail?id=" + e);
        }
    },
    // 在线预约跳转
    onlineMsgTap: function(e) {
      console.log(e,'9999999')
      var userInfo = wx.getStorageSync('user_info').data;
      if (!userInfo) {
        wx.redirectTo({
          url: "/pages/logins/logins?id=1"
        });
      }else {
        t.aldstat.sendEvent("详情页在线预约");
        var s = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: "/pages/list/onlineMsg/onlineMsg?id=" + s
        });
      }
    },
    // 预付订单跳转
    onlineMoney: function (e) {
      t.aldstat.sendEvent("详情页在线预约");
      var e = this.data.postid;
      wx.navigateTo({
        url: "/pages/list/onlineMsg/onlineMsg?id=" + e
      });
    },
    onclickAll: function(t, a) {
        this.setData({
            show01: !0,
            show02: !1
        });
    },
    onclickAll1: function(t, a) {
        this.setData({
            show01: !1,
            show02: !0
        });
    },
    openShare: function(t) {
        wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onShareAppMessage: function(a) {
        t.aldstat.sendEvent("详情页分享点击");
        var e = this.data.cId, o = this.data.imgSrc;
        return {
            title: this.data.title,
            desc: this.data.postid,
            path: "/pages/list/listDetail/listDetail?id=" + e,
            imageUrl: o,
            success: function(t) {
                console.log(1);
            },
            fail: function(t) {
                console.log(2);
            }
        };
    },
    swiperChange: function(t) {
        var a = {
            current: t
        }.current.detail.current + 1;
        this.setData({
            indexNum: a
        });
    },
    imageLoad: function() {
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
    }
});