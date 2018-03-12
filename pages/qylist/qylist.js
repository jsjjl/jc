//index.js
//获取应用实例
const app = getApp();
var tag_id = 1;

const findCompanyList = require('../../config').findCompanyList;


Page({
  data:{
    selected:true,
    selected1:false,
    tagClick_img1:'https://www.mlito.com/wx/jc/1.png',
    tagClick_img2:'https://www.mlito.com/wx/jc/2.png',
    tagClick_img3:'https://www.mlito.com/wx/jc/3.png',
    tagClick_img4:'https://www.mlito.com/wx/jc/4.png',
    tagClick_img5:'https://www.mlito.com/wx/jc/5.png',
    tjqy_list:[],
    qbqy_list:[],
    },
  onLoad: function (options) {
      var that = this;
      if(options.tagid ==1){
        that.setData({
          tagClick_img1:'https://www.mlito.com/wx/jc/1a.png'
        });
        this.tjqy_list(1);
        this.qbqy_list(1);
      }
      else if(options.tagid ==2){
        that.setData({
          tagClick_img2:'https://www.mlito.com/wx/jc/2a.png'
        });
        this.tjqy_list(2);
        this.qbqy_list(2);
      }
      else if(options.tagid ==3){
        that.setData({
          tagClick_img3:'https://www.mlito.com/wx/jc/3a.png'
        });
        this.tjqy_list(3);
        this.qbqy_list(3);
      }
      else if(options.tagid ==4){
        that.setData({
          tagClick_img4:'https://www.mlito.com/wx/jc/4a.png'
        });
        this.tjqy_list(4);
        this.qbqy_list(4);
      }
      else if(options.tagid ==5){
        that.setData({
          tagClick_img5:'https://www.mlito.com/wx/jc/5a.png'
        });
        this.tjqy_list(5);
        this.qbqy_list(5);
      };

     

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
  this.tjqy_list(1);
  this.qbqy_list(1);
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
  this.tjqy_list(2);
  this.qbqy_list(2);
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
  this.tjqy_list(3);
  this.qbqy_list(3);
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
  this.tjqy_list(4);
  this.qbqy_list(4);
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
  this.tjqy_list(5);
  this.qbqy_list(5);
},
  selected:function(e){
    this.setData({
      selected1:false,
      selected:true
    })
  },
  selected1:function(e){
    this.setData({
      selected:false,
      selected1:true
    })
  },
  postClick: function(e){
    var $data = e.currentTarget.dataset;
    console.log($data.id);
    wx.navigateTo({
      url: '../qypost/qypost?qyId='+ $data.id //传参跳转即可
    })
  },
  searchClick: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //获取推荐企业列表
  tjqy_list: function (e) {
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
          console.log("推荐企业:",res.data.data);
          that.setData({
            tjqy_list:res.data.data
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
  //获取推荐企业列表
  qbqy_list: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: findCompanyList,
      // tag_id = e,
      data: {
          tagid: e,
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



})