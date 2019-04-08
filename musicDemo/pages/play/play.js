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
        // console.log(res.data.songs[0]);
        this.setData({
          song: res.data.songs[0]
        })
      }
    });
    let { song } = app.globalData;
    if (!song) {
      song = app.globalData.song = wx.createInnerAudioContext();
    };
    // song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    // song.src ='http://static.missevan.com/MP3/201705/08/c8ab947c6a85092e5ffadcf02bbe348b184435.mp3';
    song.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    song.play();
    song.onPlay(res => {
      console.log('开始');
    });
    song.onTimeUpdate(function(){
      console.log(1)
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