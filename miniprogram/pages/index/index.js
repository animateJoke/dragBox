var plugin = requirePlugin("myPlugin")
Page({
  data:{
    url: "https://wx.rubansh.com/130/rubansh/24e4b1bef7f8cef1.png",
    flag:false,
    position:{
      left:0,
      top:0,
      scale:1,
      rotate:0
    }
  },
  focus(e){
    console.log(e)
    this.setData({
      flag: true
    })
  },
  change(e){
    console.log(e)
  },
  close(e){
    console.log(e)
    this.setData({
      flag: false
    })
  },
  click(){
    console.log(this.data.position)
  },
  onLoad: function() {
    plugin.getData()
  }
})