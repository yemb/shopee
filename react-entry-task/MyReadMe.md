

"react": "^16.4.0",
"react-dom": "^16.4.0",
"react-loadable": "^5.4.0",
"react-scripts": "1.1.4",

##  异步请求
    "axios": "^0.18.0",                 // 异步请求

##  状态管理：
    "redux": "^4.0.0",
    "react-redux": "^5.0.7",
            import { Provider } from 'react-redux'      // 跟 app.js
            import { connect } from 'react-redux'       // 每个page的index.js
            const mapStateToProps = (state) => {
                return {}
            }
            const mapDispathToProps = (dispatch) => {
                return {}
            }
            export default connect(mapStateToProps,mapDispathToProps)(Header)

    "redux-immutable": "^4.0.0",
            import { combineReducers } from 'redux-immutable'
            const reducer = combineReducers({
                header: headerReducer
            })
            export default reducer

    "redux-saga": "^2.3.0",
            单独文件处理action中的复杂业务或异步请求

    "immutable": "^3.8.2",              
        {
            fromJS: 把state创建为immuable对象
            get('xxx')
            getIn(['header', 'xxx'])
            set('xxx', xxx)
            merge({
                xxx: action.newxxx,
                yyy ...
            })
        }
        生成immutable （不可改变）对象 ，在reducer中把state变成不可改变对象，确保不会在reducer中直接对state进行修改。
        通过提供的 api 进行数值操作，不会直接改变此对象。安全且方便。

##  路由：
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",   // App.js
        import { BrowserRouter, Route } from 'react-router-dom'
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Home}></Route>
                <Route path="/detail" exact component={Detail}></Route>
            </div>
        </BrowserRouter>

##  动画:
    "react-transition-group": "^2.3.1",

##  css
    css module
    typings-for-css-modules-loader, 替代 css ，把css文件自动生成.d.ts声明文件

##  tslint:
    变量声明和inport变量需要按字母排序的问题：
    具体修改文件为/node_modules/tslint/lib/configs/recommended.js，全局搜索object-literal-sort-keys，有两个匹配项，全给改成false。

##  自适应
    viewport 解决了 dpr调整 font-size的问题，结合 px2rem-loader 方案，把 px 转成 rem
    存在问题：
        某些机型 的 宽高比 很不一样，而导致了 高度不足的情况
    解决：
        在定义父标签的高度时，用vh，或者百分比。

##  方便chrome里用 redux-devtools 查看store数据
    [https://github.com/zalmoxisus/redux-devtools-extension] (用插件很方便)



    1. 设置 @ 为 /src 目录， 实现import的绝对路径
        在 tsconfig.json 中。
    2.


## 目录结构
--------
```
  '    |-- src',
  '        |-- App.tsx', // react-router-dom 实现路由。
  '        |-- index.tsx', // 引入App.tsx、 用react-redux的provider像全局文件提供store。
  '        |-- viewport.js', // 自适应方案，在webpack的entry中添加一个入口文件即可。

  '        |-- asserts', // 静态资源文件，
  '        |   |-- css',
  '        |   |   |-- layout.css', // 本来打算抽象出一些用的比较多的公共样式，但好像没怎么用上。
  '        |   |   |-- reset.css', // 样式初始化，全局定义一些常用的颜色变量，如primary:#8560A9。
  '        |   |-- imgs',
  '        |   |-- svgs',

  '        |-- common', // 公共模块
  '        |   +-- button', // 一些常用的button
  '        |   +-- commentUI', // 评论
  '        |   |-- header', // headers头部
  '        |   |   |-- index.tsx',
  '        |   |   |-- style.css',
  '        |   |   |-- style.css.d.ts',
  '        |   |   +-- store',
  '        |   +-- listUI', // 列表
  '        |   +-- nothing', // 没有列表内容和评论内容的nothing组件
  '        |   +-- toast', // 提示框toast

  '        |-- pages', // 页面模块
  '        |   |-- detail', // 详情页
  '        |   |   |-- components', // 详情页中的各个组件
  '        |   |       +-- card, // 个人介绍组件
  '        |   |       +-- description', // activity描述组件
  '        |   |       +-- footer', // 底部组件
  '        |   |       +-- goingLike', // going 和 like 头像展示组件
  '        |   |       +-- tags', // 切换状态的tags栏
  '        |   |       +-- whenwhere', // 时间和地址展示组件
  '        |   |   |-- store', // detail页面的 store，每个页面都有自己的store
  '        |   |       |-- actionCreators.tsx', // 定义action，有的结合redux-thunk，把异步操作结合在action中；有的结合了saga，分离出了异步操作，如login页。
  '        |   |       |-- contants.tsx', // 定义存储 action 的type字段，
  '        |   |       |-- index.tsx', // import reducer，constants，actionCreator，然后export出去，统一管理整个store。
  '        |   |       |-- reducer.tsx', // 一些操作state字段的操作，结合immutable.js, 把所有数据变成不可变数据。
  '        |   |   |-- index.tsx', // 详情页入口文件
  '        |   |   |-- style.css', // 详情页样式文件
  '        |   |   |-- style.css.d.ts', // 样式type定义文件。
  '        |   +-- login', // 登陆页
  '        |   +-- list', // 列表页
  '        |   +-- me', // 个人页

  '        |-- util', // 工具库
  '        |   |-- time.js', // 对时间判断以及时间格式转换的一些函数
  '        |   |-- util.js', // 简单封装了一下axios，加入一些headers

  '        |-- store', // export 一个 createStore，并加入redux-thunk，redux-saga等中间件
  '        |   |-- rootSagas.tsx', // 引入各组件中的saga文件，并用saga/effects的 all结合一起call，并export出去在index.tsx中run。
  '        |   |-- index.tsx',
  '        |   |-- reducer.tsx', // 用redux-immuabale中的combineReducers，把所有页面的reducer结合在一起

  '        |-- lang', // 首页语言json文件，首页根据 store中关于语言的字段，require需要的json文件。
  '        |   |-- chinese.json',
  '        |   |-- english.json', // 
```

## 自适应方案设计
-------

###### viewport.js
结合px2rem组件，以40为基准计算准确的全局fontsize，
如iphone5，获取其visual viewport与理想viewport的比值，再与20相乘就是40。
如iphone， 750 / 320 * 20 = 46.875px 为根font-size


```
'    |-- src',
'        |-- viewport.js', // 自适应方案，在webpack的entry中添加一个入口文件即可。
```

###### px2rem 插件
以40px为font-size把所有px转为rem格式。如60px为1.5rem

```
test: /\.css$/,
use: [
    // css-loader ... module: true 
{
    loader: require.resolve('px2rem-loader'),
        options: {
            remUnit: 40,
            remPrecision: 8
        }          
},
……
]
```

###### config/webpack.config.dev.js 
加入
```
entry: [
    ……
    paths.viewport
],
……

```

## redux设计
-------

1. 几乎所有数据都存在store中。
2. 全局有一个store，每个页面也有自己的一个store
3. 每个store都会有 actionCreator进行action的定义，constants进行action的type的定义，reducer获取action，并进行对数据的操作

###### immutable.js
把所有的store数据变成不可变数据，通过其定义的几个api，get、set、getIn、merge进行数据的获取和操作。

###### redux-immutable
combineReducers，把所有页面的reducer结合在一起

###### react-redux
在index.tsx中
```
  <Provider store={store}>
    <App />
  </Provider>,
```
在每个组件中都可以拿到store了。

而在每个组件中获取需要的state数据，以及定义一些操作方法，都变成props里的数据。在jsx中就可以拿到。
```
    export default connect(mapStateToProps, mapDispatchToProps)(List);
```

###### redux-thunk、redux-saga
redux-thunk 把export的action可以是一个函数，并在函数中进行异步操作，然后再dispatch一个action给到reducer。
redux-saga 劫持指定 type 的action，然后进行异步操作后，再put一个action给到reducer。


##  css module
    typings-for-css-modules-loader, 替代 css-loader ，通过css文件自动生成.d.ts声明文件