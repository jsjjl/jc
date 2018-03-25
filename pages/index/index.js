//index.js
//获取应用实例
const app = getApp();
const findCompanyList = require('../../config').findCompanyList;
const findCommentList = require('../../config').findCommentList;


var authorization,
    tag_id = 1,
    icon,
wxName,
nickName,
uid,
gender;

Page({
  data: {
    jiazai:true,
    wu:false,
    jiazai2:true,
    wu2:false,
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1a.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
    gs_list:[],
    pl_list:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onShow: function (options) {
    var that = this;
    tag_id = 1;
    this.setData({
      tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1a.png',
      tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
      tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
      tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
      tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
    });
    this.qy_list(1);


    wx.request({
      url: findCommentList,
      // tag_id = e,
      data: {
        pageNum: 1,
        pageSize: 10,
      },
      
      success:function(res){

        if(res.data.state == 0){
          console.log("评论:",res.data.data);

          if(res.data.data == undefined || res.data.data == ""){
            that.setData({
              wu2: true,
              jiazai2: false
            })
          }else{
          that.setData({
            pl_list:res.data.data,
            jiazai2: false
          })
        }
        }else{
          wx.showToast({
            icon: 'loading',
            title: res.data.msg,
          });
        }

      },
      fail:function(res){
          wx.showToast({
              icon: 'loading',
              title: "服务器忙请稍后",
            });
           
      }
    });
  },
  onLoad: function () {
    var that= this;
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }




    if(that.data.hasUserInfo == true){
      that.getUserInfo();
    }


  },
tagClick_box1: function(){
  tag_id = 1;
  this.setData({
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1a.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
  });
  this.qy_list(1);
},
tagClick_box2: function(){
  tag_id = 2;
  this.setData({
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2a.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
  });
  this.qy_list(2);
},
tagClick_box3: function(){
  tag_id = 3;
  this.setData({
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3a.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
  });
  this.qy_list(3);
},
tagClick_box4: function(){
  tag_id = 4;
  this.setData({
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4a.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5.png',
  });
  this.qy_list(4);
},
tagClick_box5: function(){
  tag_id = 5;
  this.setData({
    tagClick_img1:'https://jiancaifile.dcofcity.com/icon/1.png',
    tagClick_img2:'https://jiancaifile.dcofcity.com/icon/2.png',
    tagClick_img3:'https://jiancaifile.dcofcity.com/icon/3.png',
    tagClick_img4:'https://jiancaifile.dcofcity.com/icon/4.png',
    tagClick_img5:'https://jiancaifile.dcofcity.com/icon/5a.png',
  });
  this.qy_list(5);
},
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  searchClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../search/search'}) 
  },
  userClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../sq/sq'}) 
  },
  tagClick:function(event){
    console.log(event); 
    
    wx.navigateTo({
      url: '../qylist/qylist?tagid='+ tag_id//传参跳转即可
    }) 
  },
  postClick:function(e){
    var $data = e.currentTarget.dataset;
    console.log($data.id);
    wx.navigateTo({
      url: '../qypost/qypost?qyId='+ $data.id //传参跳转即可
    })
  },
  sbClick:function(event){
    var that = this;
    console.log("判断是否获取用户信息：",icon)
    if(icon == null){

      that.getUserInfo();

      // wx.showModal({
      //   title: '提示',
      //   content: '请先使用微信登录；现在是否登录？',
      //   showCancel: true,
      //   cancelText: '否',
      //   confirmText: '是',
      //   success: function(res) {    if (res.confirm) {
      //     console.log('用户点击确定');
      //     wx.navigateTo({
      //       url: '../sq/sq?id=0'
      //     })
      //   }}
      // });
      return;
    }

    console.log(event); 
    wx.navigateTo({url:'../sbqy/sbqy'}) 
  },
  

//获取首页企业列表
  qy_list: function (e) {
    
    var that = this;
    console.log(e);
    that.setData({
      jiazai:true,
      wu:false,
      gs_list:[],
    })
  
    wx.request({
      url: findCompanyList,
      // tag_id = e,
      data: {
          tagid: e,
          isRecommend: 1,
          pageNum: 1,
          pageSize: 6,
      },
      
      success:function(res){
        if(res.data.state == 0){
          console.log("热门企业:",res.data.data);
          if(res.data.data == undefined || res.data.data == ""){
            that.setData({
              wu: true,
              jiazai: false
            })
          }else{
            that.setData({
              gs_list:res.data.data,
              jiazai:false
            })
          }
        }else{
          wx.showToast({
            icon: 'loading',
            title: res.data.msg,
          });
        }

      },
      fail:function(res){
          wx.showToast({
              icon: 'loading',
              title: "服务器忙请稍后",
            });  
      }
    });
  },











  
       //获取用户信息
    getUserInfo:function(){ 
      var that = this;  
  
      wx.login({
        success: function(res) {
          if (res.code) {
              uid = res.code
              console.log("获取的ID：",uid);
              wx.getUserInfo({  
                 success: function (res) {

                  that.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })

                        wxName = res.userInfo.nickName;
                        icon = res.userInfo.avatarUrl;
                        gender = res.userInfo.gender;
                        console.log("getUserInfo获取的：",wxName,icon,gender);
                      }  
                 });
          } else {

            wx.showModal({
              title: '提示',
              content: '获取用户登录态失败！' + res.errMsg,
              showCancel: false
            })
            
          }
        }
      });
  
    },
    
  
})
