//index.js
//获取应用实例
const app = getApp();
const findCompanyById = require('../../config').findCompanyById;
const findCommentList = require('../../config').findCommentList;
const insertComment = require('../../config').insertComment;


var uid,
tx,
content,
phone,
nickName,
companyId,
productId,
score = 5;

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
    },
    onLoad: function (options) {
      var that = this;
      this.chooseicon_a(5);


      wx.request({
        url: findCompanyById,
        // tag_id = e,
        data: {
          companyId: options.qyId,
        },
        
        success:function(res){

          if(res.data.state == 0){
            console.log("企业:",res.data.company);

            companyId = res.data.company.companyName;

            that.setData({
              product_list:res.data.product,
              picture:res.data.company.picture,
              companyName:res.data.company.companyName,
              score:res.data.company.score,
              address:res.data.company.address,
              phone:res.data.company.phone,
              companyProfile:res.data.company.companyProfile,
        
            });
            var datasbt = [];
            var datas = res.data.product;
           
            for(var i=0; i<datas.length; i++){
               datasbt.push(datas[i].productName);
            }
            productId=datasbt[0];
            console.log(productId);
           
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
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

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
    },//提交评论
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
//提交评论
tjpl_ok: function(e) {

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
      uid: uid,
    },
    
    success:function(res){

      if(res.data.state == 0){
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


 
  },
  closeModal:function(e) {
    
    this.setData({
     modal_style:"display:none",
    })
     
      
       },

})