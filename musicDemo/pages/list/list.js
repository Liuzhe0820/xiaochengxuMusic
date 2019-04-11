// pages/list/list.js
import url from "../../config/url.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    n:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: url.list + '?idx=' + options.id,
      success:(res)=>{
        console.log(res)
        this.setData({
          list: res.data.playlist.tracks.slice(this.data.n, this.data.n+10)
        });
        app.globalData.musicList = res.data.playlist.tracks;
        wx.setNavigationBarTitle({
          title: res.data.playlist.name,
        })
      }
    })
  },
  tap:function(e){
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url:'/pages/play/play?id='+id
    })
  },
  lower:function(){
    if (this.data.list.length === app.globalData.musicList.length){
      wx.showToast({
        title:'已无更多内容',
        icon:'none',
      })
    }else{
      this.data.n = this.data.n + 10;
      this.setData({
        list: app.globalData.musicList.slice(0, this.data.n + 10)
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})