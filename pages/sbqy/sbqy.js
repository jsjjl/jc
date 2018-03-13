const declareCompany = require('../../config').declareCompany;

const UploadVideo = require('../../config').UploadVideo;


var companyLinkman//企业联系人
	
		,phone//联系方式
	
		,companyName//企业名称
	
		,companyProfile//企业简介
	
    ,fileUrl;//文件url
                 
Page({
  data: {
    files: []
  },
  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          
          success: function (res) {
            var tempFilePaths = res.tempFilePaths
            wx.uploadFile({
              url: UploadVideo, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData:{
                // 'user': 'test'
              },
              success: function(res){
                var data = res.data
                console.log("返回的数据",res)
                 // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                  that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });

              }
            })

             
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },

  lxr_bt: function(e) {
    companyLinkman = e.detail.value;
  },
  dh_bt: function(e) {
    phone = e.detail.value;
  },
  mc_bt: function(e) {
    companyName = e.detail.value;
  },
  js_bt: function(e) {
    companyProfile = e.detail.value;
  },


  saveClick: function() {

    wx.request({
      url: declareCompany,
      // tag_id = e,
      data: {
        companyLinkman: companyLinkman,
        phone: phone,
        companyName: companyName,
        companyProfile: companyProfile,
      },
      
      success:function(res){
        if(res.data.state == 0){
          console.log("是否成功:",res.data);
          wx.showToast({
            icon: 'success',
            title: res.data.msg,
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



    // wx.navigateTo({
    //   url: '../index/index'
    // })
  }
})
