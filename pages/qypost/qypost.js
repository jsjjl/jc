//index.js
//获取应用实例
const app = getApp();
const findCompanyById = require('../../config').findCompanyById;
const findCommentList = require('../../config').findCommentList;
const insertComment = require('../../config').insertComment;
const findProductByCompanyIdForWX = require('../../config').findProductByCompanyIdForWX;
var util = require('../../utils/util.js');  


var uid,
icon,
wxName,
content = "",
phone,
nickName,
companyId,
productId = "",
score = 5,
addTime;

var datasbt = ["点评公司或产品","点评公司"];
var datasbt_id = ["","0"];

Page({
  data:{
    jiazai_cp:true,
    wu_cp: false,
    jiazai_pl:true,
    wu_pl:false,
    genduo_cp: false,
    genduo_wz: false,
    isAddV: 0,
    accounts: ["点评这家公司"],
    accountIndex: 0,
    accounts1: [],
    accountIndex1: 0,
    product_list:[],
    picture:"",
    companyName:"",
    score:"",
    address:"",
    phone:"",
    companyProfile:"",
    pl_list:"",
    gsdisabled:true,
    dpfs:"0",
    tjxs:true,
    modal_style:"display:none",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tag_type:[],
    },
    onLoad: function (options) {
      var that = this;
      this.chooseicon_a(5);


      //调用应用实例的方法获取全局数据  
      that.getUserInfo();
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






      wx.request({

        url: findCompanyById,
        // tag_id = e,
        data: {
          companyId: options.qyId,
        },
        
        success:function(res){

          if(res.data.state == 0){
            console.log("企业:",res.data.company);
            console.log("企业isMore:",res.data.company.isMore);
            
            companyId = res.data.company.id;

            if(res.data.isMore == 1){
              that.setData({
                genduo_cp: true,
              })
            }

            var wzgs = res.data.company.companyProfile;
            console.log("企业companyProfile:",wzgs.length);
            if(wzgs.length >= 100){
              that.setData({
                genduo_wz:true
              })
            }

            
            var  tag_type_b = [];
            var yourString=res.data.company.type;
            var result=yourString.split(",");
            for(var i=0;i<result.length;i++){
              tag_type_b.push(result[i]);
            }
            console.log(tag_type_b)
            that.setData({
              product_list:res.data.product,
              picture:res.data.company.picture,
              companyName:res.data.company.companyName,
              score:res.data.company.score,
              address:res.data.company.address,
              phone:res.data.company.phone,
              companyProfile:res.data.company.companyProfile,
              jiazai_cp: false,
              isAddV:res.data.company.isAddV,
              tag_type:tag_type_b,
            });
            
            var datas = res.data.product;
            
            if(res.data.product == undefined || res.data.product == ""){
              that.setData({
                wu_cp: true,
                jiazai_cp: false,
              })
            };

         

         
            
            

            
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







      wx.request({

        url: findProductByCompanyIdForWX,
        // tag_id = e,
        data: {
          companyId: options.qyId,
        },
 
        success:function(res){

          if(res.data.state == 0){

            var datas = res.data.product;
            
            console.log("pltag:",datas)

            datasbt = ["点评公司或产品","点评公司"];

            for(var i=0; i<datas.length; i++){

              if(datas[i].productName != "-1"){
               datasbt.push(datas[i].productName);
               datasbt_id.push(datas[i].id);
              }
              
            }

            // productId=datasbt[0];
           
           
           //然后 改好时间格式 遍历出来就好
            that.setData({
              accounts1:datasbt
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



      wx.request({
        url: findCommentList,
        // tag_id = e,
        data: {
          companyId: options.qyId,
        },
        
        success:function(res){

          if(res.data.state == 0){
            console.log("评论:",res.data.data);

            if(res.data.data == undefined || res.data.data == ""){
              that.setData({
                wu_pl: true,
                jiazai_pl: false
              })
            }else{
            that.setData({
              pl_list:res.data.data,
              jiazai_pl:false,
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
  
  bindAccountChange: function(e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          accountIndex: e.detail.value
      })
  },
  bindAccountChange1: function(e) {

    
    productId = datasbt_id[e.detail.value];

    console.log(productId);

    this.setData({
        accountIndex1: e.detail.value
    });

    if(content != "" && productId != "" ){
      this.setData({
        tjxs:false
      })
    }else{
      this.setData({
        tjxs:true
      })
    };
},
  cppostClick: function(e) {
    wx.navigateTo({
      url: '../cppost/cppost?qyId='+ companyId //传参跳转即可
    })
  },
  wzpostClick: function(e) {
   this.setData({
    genduo_wz:false
   })
  },
  chooseicon:function(e){
    
    var strnumber=e.target.dataset.id; 
     var _obj={};
      _obj.curHdIndex=strnumber; 
      score = strnumber;
      this.setData({ 
       tabArr: _obj,
       dpfs:_obj.curHdIndex
      });

      
   },
   chooseicon_a:function(e){
     
     var strnumber=e; 
      var _obj={};
       _obj.curHdIndex=e; 
       this.setData({ 
        tabArr: _obj,
        dpfs:e
       });
 
       
    },
    bindTextAreaBlur: function(e) {
      console.log(e.detail.value);
      content = e.detail.value;
      console.log(productId);
      if(productId != "" && content != "" ){
        this.setData({
          tjxs:false
        })
      }else{
        this.setData({
          tjxs:true
        })
      }
    },
    
    //提交评论
    tjpl: function(e) {
    
   this.setData({
    modal_style:"display:block",
   })
    
     
      },
      bindKeyInput_sjh: function(e) {

        phone= e.detail.value;
        // this.setData({
        //   storage_sjh:e.detail.value
        // })
        
      },bindKeyInput_xm: function(e) {
        
        nickName= e.detail.value;
        // this.setData({
        //   storage_xm:e.detail.value
        //  })
        
      },
      tjpl_on: function(e) {
         
    this.setData({
      modal_style:"display:none",
     })
      
      },
//最终提交评论
tjpl_ok: function(e) {
  // wx.setStorageSync('storage_xm', this.data.storage_xm);
  // wx.setStorageSync('storage_sjh', this.data.storage_sjh);
  var that = this;
  // var time = util.formatTime(new Date());
  // console.log(time)  
  wx.request({
    url: insertComment,
    // tag_id = e,
    data: {
      uid: uid,
      content: content,
      phone: phone,
      nickName: nickName,
      companyId: companyId,
      productId: productId,
      score: score,
      icon: icon,
      wxName: wxName,
      // addTime:time
    },
    
    success:function(res){

      if(res.data.state == 0){

        that.setData({
          modal_style:"display:none",
         });

        wx.showToast({
          icon: 'success',
          title: res.data.msg,
        });

        

        wx.request({
          url: findCommentList,
          // tag_id = e,
          data: {
            companyId: companyId,
          },
          
          success:function(res){
  
            if(res.data.state == 0){
              console.log("评论:",res.data.data);
              that.setData({
                pl_list:res.data.data
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
  closeModal:function(e) {
    
    this.setData({
     modal_style:"display:none",
    })
     
      
       },




       //获取用户信息
  getUserInfo:function(){ 
    var that = this;  

    wx.login({
      success: function(res) {
        if (res.code) {
            // code = res.code
            // console.log(code);
            wx.getUserInfo({  
               success: function (res) {
                      wxName = res.userInfo.nickName;
                      icon = res.userInfo.avatarUrl;
                       console.log(wxName);
                      console.log(icon);


                 

                    }  
               });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  },

})