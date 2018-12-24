## 命令行工具

* npm install,安装依赖
* npm start，运行代码，服务代理本地设置在package.json中，proxy: http://localhost:8000/api/v1,
* npm run format，使用standardjs标准检查代码并且自动修复

## 代码结构
项目以create-react-app脚手架建立,然后使用npm run eject 命令

config目录为构建过程项目文件

public为index.html模板文件等基础资源

scripts目录为项目命令行工具

src为项目源码目录

* src/components为项目公共组件
* configureStore为redux初始化、基础配置目录
* i18n为项目多语言资源目录
* pages为项目各个模块
    * 以detail目录为例，index.js为detail首页，components为detail模块内拆分的组件，assets为detail模块内资源文件
* util为项目公共工具方法

## 路由设计
做了简单的权限验证，根据本地是否有token进行权限校验

未登录时跳转login，登录完成后跳转为目标界面

代码中，部分error处理，简单处理为跳转回根路径`/`
```javascript
<Route path='/login' component={Login} />
<PrivateRoute path='/list' component={List} />
<PrivateRoute path='/detail/:id' component={Detail} />
<PrivateRoute path='/profile' component={Profile} />
<PrivateRoute exact path='/' component={List} />
```


## store设计

* 采用redux-saga中间件
* 采用redux-dark模式管理action/reducer/types文件，将同一模块的redux相关文件，整理在一个文件中，如listRedux.js
* store包含三个模块,初始状态为
```javascript
{
  common:{
    language:'en-us'
  },
  user:{
    status: 'PENDING',
    user: {},
    error: undefined
  },
  list:{
    status: 'PENDING',
    activities: [],
    channels: [],
    hasMore: true,
    error: undefined,
    currentActivityId: undefined
  }
}

```

## 样式设计

样式采用css-modules

采用vw/vh方案进行兼容性适配




## listview设计
基于IntersectionObserver监听dom元素可见性，实现列表的延迟渲染和无限滚动

* 首先使用空容器占位，给容器一定的高度，使得列表下方部分容器不在可视区域内
* 容器可见性发生变化，从不可见到可见时，将容器内列表元素渲染出来
* 滚动到现有列表元素到达设定阈值--快到列表结尾时，再次加载下批数据

使用示例

其中，提供currentActivityId是为了从元素详情页返回列表页时，将列表滚动到离开时的元素，避免每次返回都是在列表初始位置
```javascript
<ListView 
  list={activities} 
  onReachEnd={this.loadMore} 
  onItemTouch={this.onItemTouch} 
  currentActivityId={currentActivityId} />

``` 




## 多语言设计
实现的是应用内多语言切换，不是多语言构建

实现方案
* 项目内添加多语言文件，将需要多语言处理的文字，以key-value形式分语言类型存储
* 视图代码中，引用多语言文件资源，根据当前设置的语言类型，取值展示

locale.json部分内容如下

```javascript
{
  "en-us": {
    "login_title_big": "BLACK CAT",
    ...
  },
  "zh-cn": {
    "login_title_big": "黑 猫",
    ...
  }
}
```

当前项目将login实现了多语言切换，预览方式，在/profile界面点击'toggle language setting'
，将会设置store中的language，并跳转到login

# todo
时间所限，很多地方很不完善

* 没有测试代码
* 没有引入强类型，flow或者typescript
* 没有关注构建流程，如引入lint-staged强制lint通过才能提交代码
* store中状态切分的不够完善，请求状态这类公共状态数据，应该提到common中。action types目前直接写的字符串，没定义常量
* listview没能实现为元素复用的高性能列表，对应本项目，活动列表实际是可以根据列表元素文字长度，定义为多个类型的元素，再实现为一个多类型的结构化列表
* 未实现toast
* 多语言部分，可以建立自定义规则，检查所有需要语言转换的地方，是否有遗漏
* request部分，应该对fetch再封装，实现pre-fetch/post-fetch这类钩子方法，对请求进行统一前置处理，和统一的错误处理
* 对svg格式图片的使用，除应用logo外，直接以背景图片形式来引用，没有严格对齐设计中的图片色值
