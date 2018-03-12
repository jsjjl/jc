Page({
  data: {
        accounts: ["男", "女"],
        accountIndex: 0,
  },
    bindAccountChange: function(e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    ncClick: function() {
        wx.navigateTo({
        url: '../myedit_nc/myedit_nc'
        })
    },
    tcClick:function() {
        wx.navigateTo({
        url: '../index/index'
        })
    }
})
