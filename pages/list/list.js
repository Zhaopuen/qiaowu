const Trequest = require('../../utils/request.js')
function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t, i = getApp(), a = i.globalDataJson.gyjProductBase + "miniapi/index", c = 39, o = 0, s = 0, n = 0, r = 0, l = require("../../utils/bmap-wx.min.js"), d = [], g = function(e) {
    var t = [], l = wx.getStorageSync("area_code");
    if (e.setData({
        hidden: "block",
        hidden1: "none"
    }), e.data.keywords) e.data.keywords;
    e.data.district && (o = e.data.district), e.data.city && (c = e.data.city), e.data.price && (s = e.data.price), 
    e.data.houseType && (n = e.data.houseType), e.data.rent_date && (r = e.data.rent_date), 
     wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: a,
        data: {
            os_type: i.globalDataJson.os_type,
            os_version: i.globalDataJson.os_version,
            network: i.globalDataJson.network,
            version_code: i.globalDataJson.version_code,
            area_code: l
        },
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        success: function(i) {
            wx.hideToast();
            for (var a = i.data.content.area_ad.poster_open, c = i.data.content.area_ad.action_open.action, o = i.data.content.area_ad.action_open.action_type, s = i.data.content.area_ad.action_l.action, n = i.data.content.area_ad.poster_l, r = i.data.content.area_ad.action_rb.action, l = i.data.content.area_ad.poster_rb, d = i.data.content.area_ad.action_rt.action, g = i.data.content.area_ad.poster_rt, h = 0; h < i.data.content.recommend_house.length; h++) t.push(i.data.content.recommend_house[h]);
            if (0 == i.data.content.recommend_house.length) ;
            e.setData({
                list: t,
                action_openurl: c,
                action_openType: o,
                poster_open: a,
                action_lurl: s,
                poster_l: n,
                action_rburl: r,
                poster_rb: l,
                action_rturl: d,
                poster_rt: g
            }), e.setData({
                hidden: "none"
            });
        }
    });
}, h = function(e) {
    // var t = new l.BMapWX({
    //     ak: "XHBlxBUrLEuCPS3L7MTrwKfkQAmCFcWy"
    // });
    // g(e), t.regeocoding({
    //     fail: function(t) {
    //         1 == e.data.addressPostKey && wx.showModal({
    //             content: "因为未同意获取地理位置，所以不能获取当前位置！",
    //             showCancel: !1,
    //             success: function(e) {
    //                 e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
    //             }
    //         });
    //     },
    //     success: function(t) {
    //         // var i = t.originalData.result.addressComponent.city, a = t.originalData.result.cityCode;
    //         // if (d = t.wxMarkerData, e.setData({
    //         //     markers: d,
    //         //     city: i,
    //         //     area_code: a
    //         // }), "北京市" == i) {
    //         //     var c = 1, a = 131, o = 36;
    //         //     e.setData({
    //         //         index: c,
    //         //         area_code: a,
    //         //         citynum: o
    //         //     });
    //         // } else if ("广州市" == i) {
    //         //     var c = 2, o = 289, a = 257;
    //         //     e.setData({
    //         //         index: c,
    //         //         area_code: a,
    //         //         citynum: o
    //         //     });
    //         // } else {
    //         //     var c = 0, o = 39, a = 289;
    //         //     e.setData({
    //         //         index: c,
    //         //         area_code: a,
    //         //         citynum: o
    //         //     });
    //         // }
    //         // wx.setStorageSync("area_code", a), e.setData({
    //         //     latitude: d[0].latitude
    //         // }), e.setData({
    //         //     longitude: d[0].longitude
    //         // });
    //         // var s = d[0].address;
    //         // e.setData({
    //         //     keywords: s
    //         // });
    //     },
    //     iconPath: "../../img/marker_red.png",
    //     iconTapPath: "../../img/marker_red.png"
    // });
};

Page({
    data: (
      
      t = {
        hidden: "none",
        hidden1: "none",
        list: [],
        scrollTop: 0,
        scrollHeight: 0,
        typeID: 0,
        isLoading: !0,
        swiperTab: [],  //首页列表
        // location: ,  //省
        listImg: [],  //首页列表图片
        region: [],
        regionId: [],
        loaction: null,
        loadOver: !1,
        picshequ: '',
        picNew:'',
        picTwo:'',
        picNewUrl:'',
        picTwoUrl:'',
        picshequUrl:'',
        page: 1,
        lendata: [],
        totalList: '',
        numPerPage: 20, //设置默认一次加载数据条数
        pageNum: 1, // 设置加载的第几次，默认是第一次
        total: 0 // regardData数组（最近学习记录）的条数
      }, 
      e(t, "scrollTop", 0), 
      e(t, "array", [ "上海", "北京", "广州" ]), 
      e(t, "index", 0), 
    e(t, "districtList", [ {
        key: 39,
        value: "上海",
        district_children_list: [ {
            key: "-1",
            value: "所有区域"
        }, {
            key: 147,
            value: "静安区"
        }, {
            key: 143,
            value: "黄浦区"
        }, {
            key: 145,
            value: "徐汇区"
        }, {
            key: 146,
            value: "长宁区"
        }, {
            key: 155,
            value: "浦东新区"
        }, {
            key: 150,
            value: "虹口区"
        }, {
            key: 148,
            value: "普陀区"
        }, {
            key: 151,
            value: "杨浦区"
        } ]
    }, {
        key: 36,
        value: "北京",
        district_children_list: [ {
            key: "-1",
            value: "所有区域"
        }, {
            key: 37,
            value: "东城区"
        }, {
            key: 38,
            value: "西城区"
        }, {
            key: 41,
            value: "朝阳区"
        }, {
            key: 42,
            value: "丰台区"
        }, {
            key: 43,
            value: "石景山区"
        }, {
            key: 44,
            value: "海淀区"
        }, {
            key: 48,
            value: "顺义区"
        }, {
            key: 47,
            value: "通州区"
        } ]
    }, {
        key: 289,
        value: "广州",
        district_children_list: [ {
            key: "-1",
            value: "所有区域"
        }, {
            key: 3036,
            value: "萝岗区"
        }, {
            key: 3040,
            value: "天河区"
        }, {
            key: 3041,
            value: "海珠区"
        }, {
            key: 3042,
            value: "番禹区"
        }, {
            key: 3043,
            value: "白云区"
        }, {
            key: 3037,
            value: "南沙区"
        }, {
            key: 3038,
            value: "从化市"
        }, {
            key: 3046,
            value: "越秀区"
        }, {
            key: 3047,
            value: "黄埔区"
        }, {
            key: 3039,
            value: "增城市"
        } ]
    } ]), e(t, "priceList", [ {
        key: -1,
        value: "不限"
    }, {
        key: 1,
        value: "¥5000以下"
    }, {
        key: 2,
        value: "¥5000-10000"
    }, {
        key: 3,
        value: "¥10000-15000"
    }, {
        key: 4,
        value: "¥15000-20000"
    }, {
        key: 5,
        value: "¥20000-30000"
    }, {
        key: 6,
        value: "¥30000以上"
    } ]), e(t, "typeList", [ {
        key: -1,
        value: "不限"
    }, {
        key: 1,
        value: "一室"
    }, {
        key: 2,
        value: "二室"
    }, {
        key: 3,
        value: "三室及以上"
    } ]), e(t, "timeList", [ {
        key: -1,
        value: "不限"
    }, {
        key: 1,
        value: "1-3个月"
    }, {
        key: 2,
        value: "3-6个月"
    }, {
        key: 3,
        value: "6个月及以上"
    } ]), e(t, "districtChioceIcon", "/images/list/icon-go-black.png"), e(t, "priceChioceIcon", "/images/list/icon-go-black.png"), 
    e(t, "typeChioceIcon", "/images/list/icon-go-black.png"), e(t, "timeChioceIcon", "/images/list/icon-go-black.png"), 
    e(t, "chioceDistrict", !1), e(t, "chiocePrice", !1), e(t, "chioceType", !1), e(t, "chioceTime", !1), 
    e(t, "activeDistrictParentIndex", -1), e(t, "activeDistrictChildrenIndex", -1), 
    e(t, "activeDistrictName", "区域"), e(t, "scrollTop", 0), e(t, "scrollIntoView", 0), 
    e(t, "activePriceIndex", -1), e(t, "activeTypeIndex", -1), e(t, "activeTimeIndex", -1), 
    e(t, "activeTypeName", "房型"), e(t, "activePriceName", "租金"), e(t, "activeTimeName", "租期"), 
    e(t, "markers", []), e(t, "latitude", ""), e(t, "longitude", ""), e(t, "rgcData", {}), 
    e(t, "city", ""), t),
    makertap: function(e) {
        var t = this, i = e.markerId;
        t.showSearchInfo(d, i);
    },
    onLoad: function(e) {
      var that = this;
      // that.getIndexData({
      //   numPerPage: that.data.numPerPage,
      //   p: that.data.pageNum,
      //   city: that.data.loaction,
      // })
        this.setData({
            district: -1,
            price: -1,
            houseType: -1,
            rent_date: -1
        }), h(this), this.setData({
            height: 552,
            topBanner: 0,
            topSelect: 400,
            marginTopSetsNum: 524
        });
      // 获取省
    Trequest({
        url: 'Region/local',
        data: {},
        callback(res) {
          var arr = [];
          var arrid = [];
          var len = res.data.length;
          for (var i = 0; i < len; i++) {
              arr.push(res.data[i].region_name);
              arrid.push(res.data[i].region_id);
          }
          let loactionId = arrid[that.data.index];
          that.setData({
              region: arr,
              regionId: arrid,
              loaction: loactionId 
          })
          that.getIndexData();
        }
    });
    // 首页广告 社区
    Trequest({
      url:'adv/getlist',
      data:{
        type:3
      },
      callback(res){
        that.setData({
          picshequ: res.data.data[0].pic,
          picshequUrl: res.data.data[0].link_arr,
        })
      }
    })
    Trequest({
      url:'adv/getlist',
      data:{},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      callback(res){
        that.setData({
          picNew: res.data.data[1].pic,
          picTwo: res.data.data[2].pic,
          picNewUrl: res.data.data[1].link_arr,
          picTwoUrl: res.data.data[2].link_arr,
        })
      }
    })
},
  keywordsInputEvent: function (e) {
    var t = e.detail.value;
    this.setData({
      keywords: t,
      keywordsInputnum: 1
    });
  },
  //  发现您的新家
  findNewHouse:function(){
    var that = this;
    Trequest({
      url:'house/getlist',
      data:{
        keywords: that.data.keywords
      },
      method: 'GET',
      callback(res){
        var arr = [];
        var arrPic = [];
        var len = res.data.data;
        for (var i = 0; i < len.length; i++) {
          arr.push(res.data.data[i]);
        }
        that.setData({
          swiperTab: arr,
        })
      }
    })
  },
    // 获取省
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      loaction: this.data.regionId[e.detail.value]
    })
    this.getIndexData();
  },
    getIndexData: function(){
        let that = this;
        // 首页列表
        Trequest({
            url: 'house/getlist',
            data: {
              city: that.data.loaction,
              p: that.data.pageNum,
              // numPerPage: that.data.numPerPage,
            },
            method: 'GET',
            callback(res) {
                var arr = [];
                var arrPic = [];
                var len = res.data.data;
                for (var i = 0; i < len.length; i++) {
                    arr.push(res.data.data[i]);
                }
              let page = that.data.pageNum,
                a = that.data.total / that.data.numPerPage;
                that.setData({
                  swiperTab: arr,
                  totalList: res.data.total,
                  lendata: res.data.data
                })
            }
        });
    },

  onReachBottom: function () {
    var that = this;
    var arr1 = that.data.swiperTab,
      arr2 = [];
    let page = this.data.pageNum,
    a = this.data.total / this.data.numPerPage;
    if (a<page){
      page++;
      console.log(that.data.page, 'kkkkkk')
      Trequest({
        url: 'house/getlist',
        data: {
          city: that.data.loaction,
          p: page,
          // numPerPage: that.data.numPerPage,
        },
        method: 'GET',
        callback(res) {
          if (that.data.swiperTab.length < that.data.totalList) {
            that.setData({
              swiperTab: arr1.concat(res.data.data),
              totalList: res.data.total
            })
          }
          that.setData({
            pageNum:page
          })
        }
      })
    }
    
  },
  onShow: function() {
      this.setData({
          addressPostKey: 0,
          keywordsInputnum: 0
      });
  },
    onPullDownRefresh: function() {
        g(this);
        this.setData({
            addressPostKey: 0
        }), wx.stopPullDownRefresh();
    },
    
    brandsTap: function(e) {
        var t = e.target.id;
        if (29 == t) return !1;
        wx.navigateTo({
            url: "/pages/list/brands/brands?id=" + t
        });
    },
    choiceItem: function(e) {
        switch (e.currentTarget.dataset.item) {
          case "1":
            this.data.chioceDistrict ? this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !1
            }) : this.setData({
                districtChioceIcon: "/images/list/icon-down-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !0,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !1
            });
            break;

          case "2":
            this.data.chiocePrice ? this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !1
            }) : this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-down-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !0,
                chioceType: !1,
                chioceTime: !1
            });
            break;

          case "3":
            this.data.chioceType ? this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !1
            }) : this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-down-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !0,
                chioceTime: !1
            });
            break;

          case "4":
            this.data.chioceTime ? this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-go-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !1
            }) : this.setData({
                districtChioceIcon: "/images/list/icon-go-black.png",
                priceChioceIcon: "/images/list/icon-go-black.png",
                typeChioceIcon: "/images/list/icon-go-black.png",
                timeChioceIcon: "/images/list/icon-down-black.png",
                chioceDistrict: !1,
                chiocePrice: !1,
                chioceType: !1,
                chioceTime: !0
            });
        }
    },
    hideAllChioce: function() {
        this.setData({
            districtChioceIcon: "/images/list/icon-go-black.png",
            priceChioceIcon: "/images/list/icon-go-black.png",
            typeChioceIcon: "/images/list/icon-go-black.png",
            timeChioceIcon: "/images/list/icon-go-black.png",
            chioceDistrict: !1,
            chiocePrice: !1,
            chioceType: !1,
            chioceTime: !1
        });
    },
    
    jumpSmall: function() {
        i.aldstat.sendEvent("跳转卡想说小程序");
    },
    // onSearchBtn: function() {
    //     i.aldstat.sendEvent("首页搜索点击");
    //     var e = this.data.addressPostKey, t = this.data.keywordsInputnum, a = this.data.citynum;
    //     if (1 == e || 1 == t) c = this.data.keywords; else var c = "";
    //     wx.navigateTo({
    //         url: "search/search?keywords=" + c + "&citynum=" + a
    //     });
    // },
    selectDistrict: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            DistrictChioceIcon: "/images/list/icon-go-black.png",
            chioceDistrict: !1,
            activeDistrictName: this.data.districtList[t].value,
            list: [],
            district: this.data.districtList[t].key
        }), g(this);
    },
    selectDistrictParent: function(e) {
        console.log(this.data.districtList[e.currentTarget.dataset.index].key), console.log(this.data.district), 
        this.setData({
            activeDistrictParentIndex: e.currentTarget.dataset.index,
            activeDistrictName: this.data.districtList[e.currentTarget.dataset.index].value,
            activeDistrictChildrenIndex: 0,
            scrollTop: 0,
            scrollIntoView: 0,
            city: this.data.districtList[e.currentTarget.dataset.index].key,
            district: -1
        });
    },
    selectDistrictChildren: function(e) {
        var t = e.currentTarget.dataset.index, i = -1 == this.data.activeDistrictParentIndex ? 0 : this.data.activeDistrictParentIndex;
        console.log("==========="), console.log(this.data.districtList[i].key);
        var a = this.data.districtList[i].district_children_list[t].key;
        console.log(a), console.log("==========="), this.setData({
            activeDistrictName: this.data.districtList[i].district_children_list[t].value,
            districtChioceIcon: "/images/list/icon-go-black.png",
            chioceDistrict: !1,
            activeDistrictChildrenIndex: t,
            list: [],
            city: this.data.districtList[i].key,
            district: a
        }), g(this);
    },
    selectPrice: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            PriceChioceIcon: "/images/list/icon-go-black.png",
            chiocePrice: !1,
            activePriceName: this.data.priceList[t].value,
            list: [],
            price: this.data.priceList[t].key
        }), g(this);
    },
    selectType: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            typeChioceIcon: "/images/list/icon-go-black.png",
            chioceType: !1,
            activeTypeName: this.data.typeList[t].value,
            list: [],
            houseType: this.data.typeList[t].key
        }), g(this);
    },
    selectTime: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            timeChioceIcon: "/images/list/icon-go-black.png",
            chioceTime: !1,
            activeTimeName: this.data.timeList[t].value,
            list: [],
            rent_date: this.data.timeList[t].key
        }), g(this);
    },
    onListDetailTap: function(e) {
        i.aldstat.sendEvent("首页房源点击");
        var t = e.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "listDetail/listDetail?id=" + t
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "俏屋租房",
            desc: "",
            path: "/pages/list/list",
            imageUrl: "",
            success: function(e) {
                console.log(1);
            },
            fail: function(e) {
                console.log(2);
            }
        };
    },
    touchstart: function(e) {
        var t = this, i = arguments[0].touches[0].pageY;
        t.setData({
            // starY: i
        });
    },
    touchend: function(e) {
        var t = this, i = e.currentTarget.dataset.id, a = (e = arguments[0]).changedTouches[0].pageY;
        if (t.setData({
            endY: a,
            // starY: i
        }), i - a >= 0) {
            var c = 960, o = -270, s = 127, n = 250;
            this.setData({
                floorstatus: !0,
                height: c,
                topBanner: o,
                topSelect: s,
                marginTopSetsNum: n
            });
        } else {
            var c = 552, o = 0, s = 400, n = 524;
            this.setData({
                floorstatus: !1,
                height: c,
                topBanner: o,
                topSelect: s,
                marginTopSetsNum: n
            });
        }
    },
    postTap: function() {
        h(this);
        this.setData({
            addressPostKey: 1
        });
    },
    showSearchInfo: function(e, t) {
        this.setData({
            rgcData: {
                address: "地址：" + e[t].address + "\n",
                desc: "描述：" + e[t].desc + "\n",
                business: "商圈：" + e[t].business
            }
        });
    },
    // 好屋严选
    newsListTap: function(e) {
        var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.adnum;
        1 == a ? i.aldstat.sendEvent("首页广告位点击_左") : 2 == a ? i.aldstat.sendEvent("首页广告位点击_右上") : i.aldstat.sendEvent("首页广告位点击_右下"), 
        console.log(t), wx.navigateTo({
            url: "newsList/newsList?url=" + t
        });
    },
    // 每日新房
    newsTwoListTap:function(e){
      var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.adnum;
      1 == a ? i.aldstat.sendEvent("首页广告位点击_左") : 2 == a ? i.aldstat.sendEvent("首页广告位点击_右上") : i.aldstat.sendEvent("首页广告位点击_右下"),
        console.log(t), wx.navigateTo({
          url: "newhouse/newhouse?url=" + t
        });
    },
    // 社区活动
    shequListTap: function (e) {
      var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.adnum;
      1 == a ? i.aldstat.sendEvent("首页广告位点击_左") : 2 == a ? i.aldstat.sendEvent("首页广告位点击_右上") : i.aldstat.sendEvent("首页广告位点击_右下"),
        console.log(t), wx.navigateTo({
          url: "about/about?url=" + t
        });
    }

});