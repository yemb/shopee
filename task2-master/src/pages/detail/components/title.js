import React from 'react'
import styles from './title.css'

const Title = (props) => {
  const {
    channelName = '',
    title = '',
    avatar = '',
    username = '',
    date = ''
  } = props

  return (
    <div className={styles.container}>
      <span className={styles.channelName}>{channelName}</span>
      <p className={styles.title}>{title}</p>
      <div className={styles.creatorInfo}>
        <img alt='' className={styles.avatar} src={avatar} />
        <div className={styles.info}>
          <p className={styles.username}>{username}</p>
          <p className={styles.date}>{`Published ${date}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Title
