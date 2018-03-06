Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    postClick:function(event){
      console.log(event); 
      wx.navigateTo({url:'../qypost/qypost'}) 
    }
});