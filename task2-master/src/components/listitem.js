import React from 'react'
import styles from './listitem.css'
import moment from 'moment'
const ListItem = props => {
  const {
    data,
    onTouch = () => {}
  } = props

  let image = data.images && data.images.length && data.images[0]

  let period = image
    ? `${moment(data.begin_time).format('D MMMM YYYY')} - ${moment(data.end_time).format('D MMMM YYYY')}`
    : `${moment(data.begin_time).format('D MMMM YYYY HH:mm:ss')} - ${moment(data.end_time).format('D MMMM YYYY HH:mm:ss')}`
  return (
    <div className={styles.activity}>
      <div className={styles.activityHeader}>
        <img alt='' className={styles.avatar} src={data.creator.avatar} />
        <span className={styles.username}>{data.creator.username}</span>
        <p className={styles.channel}>{data.channel.name}</p>
      </div>

      <div className={styles.activityContent} onClick={() => {
        onTouch(data)
      }}>
        <div className={styles.leftContent}>
          <p className={styles.title}>{data.name}</p>
          <p className={styles.date}>{period}</p>
          <p className={styles.detail}>{data.description}</p>
        </div>
        {image ? <img alt='' src={image} style={{width: '64px', height: '64px'}} /> : null}
      </div>

      <div className={styles.activityFooter}>
        <a
          className={data.me_going ? styles.participated : styles.participate}
        >
          {data.me_going ? `I am going` : `${data.goings_count} Going`}
        </a>
        <a
          className={data.me_likes ? styles.liked : styles.like}
        >
          {data.me_likes ? `I like it` : `${data.likes_count} Likes`}
        </a>
      </div>
    </div>
  )
}

export default ListItem
