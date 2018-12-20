import * as React from 'react';
import * as styles from './style.css'
import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import Toast from '@/common/toast/index'

interface IProps {
  loginStatus: any,
  loginError: any,
  passWord: any,
  userName: any,
  lang: any,
  changeLogin: any,
  changeInput: any,
  changeLang: any
}

class Login extends React.Component<IProps> {
  public render() {
    const { 
      loginStatus, 
      changeLogin, 
      userName, 
      passWord, 
      changeInput,
      loginError, 
      lang, 
      changeLang
    }  = this.props

    const buttonText = () => {
      if(lang === 'en') {
        return '中文'
      } else {
        return 'Eng'
      }
    }
    const text = lang === 'ch' ? require('@/lang/chinese.json') : require('@/lang/english.json')
    if(loginStatus) {
      return (
        <Redirect to="/list" />
      )
    }else {
      return (
        <React.Fragment>
          <div className={styles.wrapper}>
            <div className={styles.button} onClick={changeLang}>
              {buttonText()}
            </div>
            <div className={styles.bg}/>
            {
              loginError ?
             <Toast message="用户名或密码错误"/>:
              <></>
            }
            <div className={styles.content}>
              <span className={styles.title}>FIND THE MOST LOVED ACTIVITIED</span>
              <span className={styles.title2}>BLACK CAT</span>
              <i className={styles.icon}><span className={styles.img} /></i>
              {
                loginError?
                <p className={styles.error}>用户名或密码错误</p>:
                <></>
              }
              <div className={styles.box}>
                <div className={styles.userinput}>
                  <span><i className={styles.userIcon} /></span>
                  <input 
                    type="text" 
                    placeholder={text.username}
                    name="un"
                    value={userName}
                    onChange={changeInput}
                    />
                </div>
                <div className={styles.passWordinput}>
                  <span><i className={styles.passWordIcon} /></span>
                  <input 
                    type="text" 
                    placeholder={text.password}
                    name='pw'
                    value={passWord} 
                    onChange={changeInput}
                    />
                </div>
              </div>
            </div>
            <Link to={loginStatus? "/list": ""}>
              <div className={styles.sign} onClick={() => changeLogin(userName, passWord)}>
                <span>{text.signin}</span> 
              </div>
            </Link>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    loginStatus: state.getIn(['login', 'login']),
    loginError: state.getIn(['login', 'loginError']),
    passWord: state.getIn(['login', 'passWord']),
    userName: state.getIn(['login', 'userName']),
    lang: state.getIn(['login', 'lang'])
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLogin(username: any, password: any){
      console.log('login in login')
      dispatch(actionCreators.loginAsync(username, password))
    },
    changeInput(e:any) {
      dispatch(actionCreators.changeInput(e.target.name, e.target.value))
    },
    changeLang() {
      dispatch(actionCreators.changeLang())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
