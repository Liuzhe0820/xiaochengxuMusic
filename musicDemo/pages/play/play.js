// pages/play/play.js
import url from "../../config/url.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {},
    src: {},
    duration:0,
    current:0,
    isDown:false,
    isPause:false,
    lrc:{
      '0':'正在获取歌词'
    },
    currentlrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    wx.request({//获取歌词
      url: url.lyric+'?id='+id,
      success:(res)=>{
        let { lyric }=res.data.lrc;
        let r = /\[(.*?)](.*)/g;
        let obj = {};
        lyric.replace(r,($0,$1,$2)=>{
          obj[$1.substring(0,5)]=$2;
        });
        this.setData({
          lrc:obj
        });
      }
    });
    wx.request({//获取歌曲详情
      url: url.musicDetail + '?ids=' + id,
      success: (res) => {
        this.setData({
          song: res.data.songs[0]
        });
        let { song } = app.globalData;//全局音频播放

        if (!song) {
          // song = app.globalData.song = wx.createInnerAudioContext();
          song = app.globalData.song = wx.getBackgroundAudioManager();
        };
        song.title = this.data.song.name;
        song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
        song.play();
        song.onPlay(res => {
          this.setData({
            isPause: song.paused
          });
        });
        song.onTimeUpdate(()=>{//播放进度监控
          if(this.data.duration!==song.duration){
            this.setData({
              duration:song.duration
            });
          };
          if(!this.data.isDown){
            this.setData({
              current: song.currentTime
            })
          };
          let { currentTime } = song;
          let min = Math.floor(currentTime/60);
          let sec = Math.floor(currentTime%60);
          let attr = (min < 10 ? '0' + min :''+ min) + ':' + (sec < 10 ? '0' + sec :'' +sec);
          if (attr in this.data.lrc && 'el-' + attr !== this.data.currentlrc){
            this.setData({
              currentlrc : 'el-' + attr
            })
          }
        });
      }
    });
    

  },
  changing:function(){//进度拖拽
    this.setData({
      isDown:true
    })
  },
  change:function(e){//拖拽后定义播放时间
    this.setData({
      isDown: false
    });
    app.globalData.song.seek(e.detail.value)
  },
  playTap:function(){//播放暂停
    let { song } = app.globalData;
    if (!this.data.isPause){
      this.setData({
        isPause: true
      });
      song.pause();
    }else{
      song.play();
      this.setData({
        isPause: false
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