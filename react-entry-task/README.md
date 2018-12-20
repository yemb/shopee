## 开始
```
npm install
```
&
```
npm start
```

## 目录结构
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
  '        |   +-- notFound', // 404 页面

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

#### viewport.js
结合px2rem组件，以40为基准计算准确的全局fontsize，
如iphone5，获取其visual viewport与理想viewport的比值，再与20相乘就是40。
如iphone， 750 / 320 * 20 = 46.875px 为根font-size


```
'    |-- src',
'        |-- viewport.js', // 自适应方案，在webpack的entry中添加一个入口文件即可。
```

#### px2rem 插件
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

#### config/webpack.config.dev.js 
加入
```
entry: [
    ……
    paths.viewport
],
……

```

## redux设计

1. 几乎所有数据都存在store中。
2. 全局有一个store，每个页面也有自己的一个store
3. 每个store都会有 actionCreator进行action的定义，constants进行action的type的定义，reducer获取action，并进行对数据的操作

#### immutable.js
把所有的store数据变成不可变数据，通过其定义的几个api，get、set、getIn、merge进行数据的获取和操作。

#### redux-immutable
combineReducers，把所有页面的reducer结合在一起

#### react-redux
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

#### redux-thunk、redux-saga
redux-thunk 把export的action可以是一个函数，并在函数中进行异步操作，然后再dispatch一个action给到reducer。
redux-saga 劫持指定 type 的action，然后进行异步操作后，再put一个action给到reducer。

##  css module
    typings-for-css-modules-loader, 替代 css-loader ，通过css文件自动生成.d.ts声明文件

##  无限加载滚动

#### refs获取滚动元素
```
    private myRef: React.RefObject<HTMLDivElement>;
    …… 
    this.myRef = React.createRef();
    ……
    <div 
        className={styles.Wrapper}
        ref={this.myRef}
    >
```

#### 添加监听滚动事件
根据 scrollTop、scrollHeight、clientHieght的关系判断是否滚动到了底部。
```
    public handleScroll() {
        const scrollTop = this.myRef.current!.scrollTop
        const scrollHeight = this.myRef.current!.scrollHeight
        const clientHeight = this.myRef.current!.clientHeight
        const preLoadDis = 30
        if(this.state.isend) {
            return
        }
        if((scrollTop + clientHeight) >= (scrollHeight - preLoadDis) && this.state.loading === false){
            this.setState ({
                loading: true
            })
            setTimeout(()=>{
                this.props.getMoreEvent(this.props.page, this.props.activeChannel, this.props.activeDate)
                this.setState({
                    loading: false
                })
            },500)
        }
    }
    public componentDidMount() {
        console.log(this.myRef.current)
        this.myRef.current!.addEventListener('scroll',this.handleScroll)
    }
```

## 登录态问题
1. 封装axios请求时，对需要token字段的请求判断sessionStorage中是否有token字段
2. 如果没有则跳到login页面，并提示需要先登录。如有则取token加入header中，继续请求。
3. login成功返回的token字段存入sessionStorage中

## 路由设计
在app.tsx中：
```
        <BrowserRouter>
          <div>
            <Route path='/' exact={true} component={Login} />
            <Route path='/login' exact={true} component={Login} />
            <Route path='/list' exact={true} component={List} />
            <Route path='/me' exact={true} component={Me} />
            <Route path='/detail/:id' exact={true} component={Detail} />
            <Route path='*' exact={true} component={notFound}/>
          </div>
        </BrowserRouter>
```
