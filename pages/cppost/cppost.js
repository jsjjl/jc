//index.js
//获取应用实例

const app = getApp();
const findProductByCompanyIdForWX = require('../../config').findProductByCompanyIdForWX;

Page({
  data:{
    product_list:[]
  },
  onLoad: function (options) {
    var that = this;
  
    wx.request({
      url: findProductByCompanyIdForWX,
      // tag_id = e,
      data: {
        companyId: options.qyId,
      },
      
      success:function(res){

        if(res.data.state == 0){
         

          that.setData({
            product_list:res.data.product,
          });
          
          
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
})