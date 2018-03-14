const findCompanyByName = require('../../config').findCompanyByName;
const heatSearch = require('../../config').heatSearch;

Page({
    data: {
        jiazai:true,
        wu:false,
        inputShowed: false,
        inputVal: "",
        qbqy_list:[],
        tag:true,
        list:false,
        rmqy_list:[],
    },
  onLoad: function (options) {
    var that = this;
    wx.request({
        url: heatSearch,
        // tag_id = e,
        data: {
            // companyName: e,
        },
        
        success:function(res){
          if(res.data.state == 0){
            console.log("全部企业:",res.data.data);
            if(res.data.data == undefined || res.data.data == ""){
              that.setData({
                wu: true,
                jiazai: false
              })
            }else{
            that.setData({
               rmqy_list:res.data.data,
               jiazai: false
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
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            tag:true,
            list:false,
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            tag:true,
            list:false,
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        console.log(e.detail.value);
        this.qbqy_list(e.detail.value);

        
        this.setData({
            tag:false,
            list:true,
            inputVal: e.detail.value
        });
    },
    postClick:function(e){
        var $data = e.currentTarget.dataset;
        console.log($data.id);
        wx.navigateTo({
          url: '../qypost/qypost?qyId='+ $data.id //传参跳转即可
        })
      },
    //获取推荐企业列表
    qbqy_list: function (e) {
      var that = this;
      console.log(e);
      wx.request({
        url: findCompanyByName,
        // tag_id = e,
        data: {
            companyName: e,
        },
        
        success:function(res){
          if(res.data.state == 0){
            console.log("全部企业:",res.data.data);
            that.setData({
              qbqy_list:res.data.data
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
    }
});