const declareCompany = require('../../config').declareCompany;

const UploadVideo = require('../../config').UploadVideo;


var companyLinkman=""//企业联系人
	
		,phone=""//联系方式
	
		,companyName//企业名称
	
    ,companyProfile//企业简介
    
    ,fileNum = 0//文件个数
	
    ,fileUrl;//文件url
                 
Page({
  data: {
    files: [],
    lxr_inputVal: "",
    mc_inputVal: "",
    dh_inputVal: "",
    js_inputVal: "",
    
  },
  chooseImage: function (e) {

    
    // var that = this; 
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var tempFilePaths = res.tempFilePaths;
    //     that.upload(that, tempFilePaths);
    //   }
    // })



      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          
          
          success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            console.log(tempFilePaths[0]);
            wx.showToast({
                  icon: "loading",
                  title: "正在上传"
            });
            wx.uploadFile({
              url: UploadVideo, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'upfile',
              formData:{
                // 'user': 'test'
              },
              success: function(res){
                var data = res.data
                console.log("返回的数据0",res)
                console.log("返回的数据1",res.statusCode)

                var adata=JSON.parse(res.data);
                console.log("返回的数据2",adata.state);

                if (res.statusCode != 200 || adata.state != 0) { 
                            wx.showModal({
                              title: '提示',
                              content: '上传失败',
                              showCancel: false
                    })
                            return;
                }
                 // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                  that.setData({
                    files: that.data.files.concat("https://"+adata.data)
                });
                fileNum ++;
                console.log("图片个数：", fileNum)
                if(fileNum == 1){
                  fileUrl = "https://"+adata.data
                }else{
                  fileUrl = fileUrl + ",https://" + adata.data 
                }


              },
              fail: function (e) {
                console.log("上传失败:",e);
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
              },
              complete: function () {
                wx.hideToast();  //隐藏Toast
              }
            })

             
          }
      })
  },




  previewImage: function(e){
    console.log("当前显示图片的http链接:",e.currentTarget.id);
    console.log("需要预览的图片http链接列表:",this.data.files);
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

if(companyLinkman =="" || phone == ""){
  wx.showModal({
    title: '提示',
    content: '企业联系人、联系电话为必填项',
    showCancel: false
  });
  return
}else{
  
  var myreg=/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/;  
  if (!myreg.test(phone)) {
    wx.showModal({
      title: '提示',
      content: '手机号格式错误',
      showCancel: false
    });  
      return;  
  } 
}

    var that = this;
    console.log(fileUrl)
    wx.request({
      url: declareCompany,
      // tag_id = e,
      data: {
        companyLinkman: companyLinkman,
        phone: phone,
        companyName: companyName,
        companyProfile: companyProfile,
        fileUrl:fileUrl,
      },
      
      success:function(res){
        if(res.data.state == 0){
          console.log("是否成功:",res.data);
          wx.showToast({
            icon: 'success',
            title: "您已提交成功",
            duration: 2000
            // title: res.data.msg,<br/>请保持通讯畅通
          });
          fileNum = 0;

          that.setData({
            files: [],
            lxr_inputVal: "",
            mc_inputVal: "",
            dh_inputVal: "",
            js_inputVal: "",
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



    // wx.navigateTo({
    //   url: '../index/index'
    // })
  }
})
