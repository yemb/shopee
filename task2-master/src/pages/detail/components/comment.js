import React from 'react'
import moment from 'moment'
import styles from './comment.css'

const Comments = ({ comments = [], setRef = () => {} }) => {
  if (comments.length === 0) return <div className={styles.empty} />
  return (
    <div ref={(ref) => { setRef('commentsRef', ref) }} className={styles.container}>
      {comments.map((item, index) => {
        return (
          <div key={index} className={styles.comment}>
            <img alt='' className={styles.avatar} src={item.user.avatar} />
            <p className={styles.username}>{item.user.username}</p>
            <p className={styles.datetime}>{moment(item.create_time).startOf('day').fromNow()}</p>
            <p className={styles.content}>{item.comment}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
