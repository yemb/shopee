

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

