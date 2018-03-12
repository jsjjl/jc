//index.js
//获取应用实例
const app = getApp();
const findCompanyList = require('../../config').findCompanyList;
const findCommentList = require('../../config').findCommentList;


var authorization,
    tag_id = 1;

    // https://jiancaifile.dcofcity.com/image/1.png
    // https://jiancaifile.dcofcity.com/image/1.png

    

Page({
  data: {
    tagClick_img1:'https://www.mlito.com/wx/jc/1a.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
    gs_list:[],
    pl_list:[],
  },
  onLoad: function (options) {
    var that = this;

    this.qy_list(1);

    
    wx.request({
      url: findCommentList,
      // tag_id = e,
      data: {
        
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
tagClick_box1: function(){
  tag_id = 1;
  this.setData({
    tagClick_img1:'https://www.mlito.com/wx/jc/1a.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
  });
  this.qy_list(1);
},
tagClick_box2: function(){
  tag_id = 2;
  this.setData({
    tagClick_img1:'https://www.mlito.com/wx/jc/1.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2a.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
  });
  this.qy_list(2);
},
tagClick_box3: function(){
  tag_id = 3;
  this.setData({
    tagClick_img1:'https://www.mlito.com/wx/jc/1.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3a.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
  });
  this.qy_list(3);
},
tagClick_box4: function(){
  tag_id = 4;
  this.setData({
    tagClick_img1:'https://www.mlito.com/wx/jc/1.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4a.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
  });
  this.qy_list(4);
},
tagClick_box5: function(){
  tag_id = 5;
  this.setData({
    tagClick_img1:'https://www.mlito.com/wx/jc/1.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5a.png',
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
    console.log(event); 
    wx.navigateTo({url:'../sbqy/sbqy'}) 
  },
  

//获取首页企业列表
  qy_list: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: findCompanyList,
      // tag_id = e,
      data: {
          tagid: e,
          isRecommend: 1
      },
      
      success:function(res){
        if(res.data.state == 0){
          console.log("热门企业:",res.data.data);
          that.setData({
            gs_list:res.data.data
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
  
})
