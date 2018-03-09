//index.js
//获取应用实例
const app = getApp();
const loginByWX = require('../../config').loginByWX;

var authorization;


Page({
  data: {
  },
  onLoad: function (options) {
    var that = this;

    //url获取参数
    // authorization = options.wx_id;
    // console.log("接收到的参数是wx_id:", authorization); 

    //ajax接口请求
    // wx.request({
    //     url: findPassClientList,
        
    //     data: {
    //         authorization: authorization
    //     },
        
    //     success:function(res){ 

    //         if(res.data.state == 200){

    //             console.log(res.data.data);

    //         }else{

    //           wx.showToast({
    //             icon: 'loading',
    //             title: res.data.msg,
    //           })
            
    //        }
          

    //     },
    //       fail:function(res){

    //         wx.showToast({
    //           icon: 'loading',
    //           title: res.data.msg,
    //         })

    //     }
    //   });

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
    wx.navigateTo({url:'../qylist/qylist'}) 
  },
  postClick:function(event){
    console.log(event);
    
    // var $data = e.currentTarget.dataset;
    // console.log($data.id);
    // wx.navigateTo({
    //   url: '../qypost/qypost?taskId='+ $data.id //传参跳转即可
    // })

    wx.navigateTo({url:'../qypost/qypost'}) 
  },
  sbClick:function(event){
    console.log(event); 
    wx.navigateTo({url:'../sbqy/sbqy'}) 
  }
  
})
