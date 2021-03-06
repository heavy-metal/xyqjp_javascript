// pages/login/studentLogin/carOrder/index.js

import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[],
    orderArray:['关闭','取消','正常'],
    payStatesArray:['退款','未支付','已支付'],
    pingjia:['']
  
  },

  totalPage:0,

  params:{
    UserId:'',
    PageSize:10,
    CurrentPage:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  onShow: function () {
    var data = wx.getStorageSync('isScore');
    if (data.isScore==='ok'){
      this.setData({listArray:[]})
      this.getdata()
      wx.removeStorageSync('isScore');
    }
    
  },

  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    request({url:'SearchOrder'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data],
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  // 滚动条触底 上拉加载更多页
  onReachBottom() { 
    if(this.params.CurrentPage>=this.params.PageSize){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
    }else{
      this.params.CurrentPage++;
      this.getdata();
    }
  },
  //下拉刷新
  onPullDownRefresh(){
      this.setData({listArray:[]})
      this.params.CurrentPage = 1;
      this.getdata()
  },
  //订单详情
  orderDetailClick(e){
    const {index} = e.currentTarget.dataset
    var model = this.data.listArray[index]
    wx.navigateTo({
      url: '/pages/login/studentLogin/carOrderDetail/index?model='+JSON.stringify(model)
    });
  },

  //评价按钮
  evaluationClick(e){

  }
})