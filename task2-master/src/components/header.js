import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.css'

const Header = ({ renderLeft = undefined, avatar = '', setRef = () => {} }) => {
  const avatarSrc = avatar || 'https://coding.net/static/fruit_avatar/Fruit-19.png'
  return (
    <div ref={(element) => { setRef('header', element) }} className={styles.header}>
      {
        renderLeft !== undefined
          ? renderLeft()
          : <Link className={styles.left} to='/list'>首页</Link>

      }
      <div className={styles.title}>
        <svg style={{width: '24px', height: '24px'}} id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
          <title>logo-cat</title>
          <polygon
            style={{fill: '#D5EF7F'}}
            points='26.47 14.44 23.07 19.93 23.07 27.38 25.83 29.84 19.2 29.84 21.89 27.36 21.89 19.72 15.69 10.95 19.62 10.95 21.48 9.19 18.18 4.17 14.73 3.14 15.15 -0.03 9.92 4.17 2.83 17.38 7.78 28.12 5.51 30.53 5.51 31.97 9.26 31.97 10.18 31.48 10.93 31.97 29.94 31.97 29.94 30.25 25.68 25.99 25.68 20.55 27.96 16.84 28.78 16.84 29.2 20.08 30.4 20.08 30.71 14.44 26.47 14.44' />
        </svg>
      </div>
      <Link to='/profile'><img alt='' className={styles.right} src={avatarSrc} /></Link>
    </div>
  )
}

export default Header
