import React, { Component } from 'react'
import styles from './index.css'
import user from './assets/user.svg'
import password from './assets/password.svg'
import { connect } from 'react-redux'
import {
  Redirect
} from 'react-router-dom'
import messages from '../../i18n'

class Login extends Component {
    state = {
      username: '',
      password: ''
    }

    login = () => {
      const { username = '', password = '' } = this.state
      if (username.trim() === '' || password.trim() === '') {
        return
      }
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username,
          password
        }
      })
    }

    handleUsername=(event) => {
      this.setState({
        username: event.target.value
      })
    }

    handlePwd=(event) => {
      this.setState({
        password: event.target.value
      })
    }

    render () {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const {language} = this.props
      if (this.props.token) {
        return (
          <Redirect to={from} />
        )
      }
      return (
        <div className={styles.login}>
          <div className={styles.container}>
            <p className={styles.titleSmall}>{messages[language]['login_title_small']}</p>
            <p className={styles.titleBig}>{messages[language]['login_title_big']}</p>
            <div className={styles.logo}>
              <svg style={{width: '45px', height: '45px'}} id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                <title>logo-cat</title>
                <polygon
                  style={{fill: '#D5EF7F'}}
                  points='26.47 14.44 23.07 19.93 23.07 27.38 25.83 29.84 19.2 29.84 21.89 27.36 21.89 19.72 15.69 10.95 19.62 10.95 21.48 9.19 18.18 4.17 14.73 3.14 15.15 -0.03 9.92 4.17 2.83 17.38 7.78 28.12 5.51 30.53 5.51 31.97 9.26 31.97 10.18 31.48 10.93 31.97 29.94 31.97 29.94 30.25 25.68 25.99 25.68 20.55 27.96 16.84 28.78 16.84 29.2 20.08 30.4 20.08 30.71 14.44 26.47 14.44' />
              </svg>
            </div>

            <div className={styles.inputWrapper} style={{marginTop: '118px'}}>
              <img alt='' src={user} className={styles.icon} />
              <input
                className={styles.input}
                type='text' id='username' name='username' placeholder={messages[language]['login_username_placeholder']}
                onChange={this.handleUsername}
                value={this.state.username} />

            </div>
            <div className={styles.inputWrapper} style={{marginTop: '16px'}}>
              <img alt='' src={password} className={styles.icon} />
              <input className={styles.input} type='text' id='pwd' name='pwd' placeholder={messages[language]['login_password_placeholder']}
                onChange={this.handlePwd}
                value={this.state.password} />
            </div>
          </div>
          <button className={styles.sign} onClick={this.login}>
            {messages[language]['login_submit_value']}
          </button>
        </div>

      )
    }
}

const mapStateToProps = ({ user,common }) => {
  return {
    token: user.token,
    status: user.status,
    language:common.language
  }
}

export default connect(
  mapStateToProps
)(Login)
