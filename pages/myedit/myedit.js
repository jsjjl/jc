const findWXUser = require('../../config').findWXUser;
const updateWXUser = require('../../config').updateWXUser;

var myid,
    bdnc;

Page({
  data: {
        accounts: ["未知", "男", "女"],
        accountIndex: 0,
        wxh:"",
        nc:""
  },
  onLoad: function (options) {
    var that = this;
    myid = options.myid;
    console.log(options.myid);

    wx.request({
        url: findWXUser,
        data: {
            id: myid,
        },
        
        success:function(res){
          if(res.data.state == 0){
            bdnc = res.data.data.nickName;
            that.setData({
                accountIndex:res.data.data.gender,
                wxh:res.data.data.wxName,
                nc:res.data.data.nickName,
            })
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
    bindAccountChange: function(e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);
        
        var xmid = e.detail.value;
        console.log(updateWXUser+"?id="+myid+"&gender="+xmid);
        var that = this;
        wx.request({
            url: updateWXUser,
            data: {
                id: myid,
                gender: xmid
            },
            
            success:function(res){
              if(res.data.state == 0){
                that.setData({
                    accountIndex: xmid
                })
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
    ncClick: function() {
        wx.navigateTo({
        url: '../myedit_nc/myedit_nc?myid=' + myid +'&bdnc=' + bdnc //传参跳转
        })
    },
    tcClick:function() {
        wx.navigateTo({
        url: '../index/index'
        })
    }
})
