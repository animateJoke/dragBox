# dragBox
小程序移动、缩放、选择功能组件

开始使用
小程序的插件使用还不是很熟，所以暂时只想到一个比较笨的引入使用方法，就是把代码下载到自己的项目中使用；而且查找了一下小程序第三方插件开发的文档；好像只有企业和组织具有提交插件的权限；如有大神知道如何操作请在项目留言

组件属性和方法
drag 属性：

注：请知晓：本组件所有长度单位都是rpx;

1、width/height 容器的宽/高 只支持Number 默认值 300

2、iconSize 组件下方icon的大小；默认宽高一样（正方形）只支持Number 默认值30

3、bgColor 组件容器的背景颜色 支持所有颜色格式 默认值 transparent

4、translate/scale/rotate 是否支持移动/缩放/旋转供能 只支持Boolean 默认都为 true

5、position 组件的初始状态

  默认数据 {
    left: 0,
    top: 0,
    scale: 1,
    rotate: 0
  }
6、focus 组件下方按钮是否显示 支持Boolean

7、showClose 是否需要 下方左侧按钮 支持Boolean

事件

close 组件下方左侧按钮点击事件

change 组件状态发声变化时触发的时间 返回参数 { left: 0, top: 0, scale: 1, rotate: 0 }

插槽

content 容器内容

left 左侧按钮

right 右侧按钮
