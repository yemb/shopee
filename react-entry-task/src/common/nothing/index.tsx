import * as React from 'react';
import * as styles from './style.css'

const Nothing = (props: any) => {
  const { status } = props
  return (
    <section className={status!=='me' ? styles.wrapper : styles.wrapperMe}>
      <i><span className={styles.icon}/></i>
      {
        status === "comments"?
        <p className={styles.text}>no comments found</p>:
        <p className={styles.text}>no activity found</p>
      }
    </section>
  )
}

export default Nothing;
