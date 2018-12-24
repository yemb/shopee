import React from 'react'
import styles from './participant.css'
const Participant = props => {
  const {
    participants = [],
    likes = [],
    setRef = () => {}
  } = props
  return (
    <div ref={(ref) => { setRef('participantRef', ref) }} className={styles.container}>
      <div className={styles.statistics}>
        <div className={styles.going}>{`${participants.length} Going`}</div>
        <div className={styles.avatarList}>
          {participants.map(item => (<img alt='' key={item.id} src={item.avatar} className={styles.avatar} />))}
        </div>
      </div>
      <div className={styles.statistics}>
        <div className={styles.like}>{`${likes.length} likes`}</div>
        <div className={styles.avatarList}>
          {likes.map(item => (<img alt='' key={item.id} src={item.avatar} className={styles.avatar} />))}
        </div>
      </div>
    </div>
  )
}

export default Participant
