// pages/play/play.js
import url from "../../config/url.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {},
    src: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    let src;
    wx.request({
      url: url.musicDetail + '?ids=' + id,
      success: (res) => {
        console.log(res.data.songs[0]);
        this.setData({
          song: res.data.songs[0]
        });
        let { song } = app.globalData;
        if (!song) {
          song = app.globalData.song = wx.createInnerAudioContext();
          song = app.globalData.song = wx.getBackgroundAudioManager();
          song.title = this.data.song.name;
        };
        song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;

        song.play();
        song.onPlay(res => {
          console.log('开始');
        });
        song.onTimeUpdate(function () {
          console.log(1)
        });
      }
    });



    // wx.request({
    //   url: url.musicPlay +'?id='+id,
    //   success:(res)=>{
    //     console.log(res);
    //     this.setData({
    //       src: res.data.data[0]
    //     });
    //     console.log(this.data.src);
    //     let { song } = app.globalData;
    //     console.log(song);
    //     if (!song) {
    //       song = app.globalData.song = wx.createInnerAudioContext();
    //     };
    //     song.src = this.data.src.url;
    //     song.play();
    //     song.onPlay(res => {
    //       console.log('开始');
    //       song.onTimeUpdate(() => {
    //         console.log(1);
    //         console.log(song)
    //       });
    //     });

    //   }
    // })

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