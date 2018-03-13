//index.js
//获取应用实例
const app = getApp();
const findCompanyById = require('../../config').findCompanyById;
const findCommentList = require('../../config').findCommentList;
const insertComment = require('../../config').insertComment;
var util = require('../../utils/util.js');  


var uid,
icon,
wxName,
content,
phone,
nickName,
companyId,
productId = "",
score = 5,
addTime;

var datasbt = ["选择产品"];
var datasbt_id = [""];

Page({
  data:{
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
            

            companyId = res.data.company.id;

            that.setData({
              product_list:res.data.product,
              picture:res.data.company.picture,
              companyName:res.data.company.companyName,
              score:res.data.company.score,
              address:res.data.company.address,
              phone:res.data.company.phone,
              companyProfile:res.data.company.companyProfile,
        
            });
            
            var datas = res.data.product;
           
            for(var i=0; i<datas.length; i++){
               datasbt.push(datas[i].productName);
               datasbt_id.push(datas[i].id);
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
    })
},
  cppostClick: function() {
    wx.navigateTo({
      url: '../cppost/cppost'
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
      this.setData({
        tjxs:false
      })
    },
    
    //提交评论
    tjpl: function(e) {
    
   this.setData({
    modal_style:"display:block",
   })
    
     
      },
      bindKeyInput_sjh: function(e) {
phone= e.detail.value
        
      },bindKeyInput_xm: function(e) {
        
        nickName= e.detail.value
        
      },

//最终提交评论
tjpl_ok: function(e) {
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