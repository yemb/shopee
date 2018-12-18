import * as React from 'react'
import * as styles from './style.css'

const Card = (props: any) => {
    const {detail} = props
    // const day = () => {

    // }
    return (
        <section className={styles.wrapper}>
            <div className={styles.channel}>{detail.getIn(['channel','name'])}</div>
            <p className={styles.name}>{detail.get('name')}</p>
            <div className={styles.card}>
                <img src={detail.getIn(['creator','avatar'])} className={styles.card_left}/>
                <div className={styles.card_right}>
                    <p className={styles.userName}>{detail.getIn(['creator', 'username'])}</p>
                    <p className={styles.date}>published 2 day ago</p>
                </div>
            </div>
        </section>
    )
}
export default Card