import * as styles from './style.css'
import * as React from 'react'

const WhenWhere = (props: any) => {
    const { detail } = props
    console.log(detail)
    return (
        <section className={styles.wrapper}>
            <section className={styles.when}>
                <p className={styles.title}>when</p>
                <div className={styles.panel}>
                    <div className={styles.left}>
                        <div>
                            <i><span className={styles.icon1}/></i>
                            {/* <span>{detail.get('begin_time')}</span> */}
                            <span>15 April 2015</span>
                        </div>
                        <p>8:30 <span>am</span></p>
                    </div>
                    <div className={styles.right}>
                        <div>
                            <i><span className={styles.icon2}/></i>
                            {/* <span>{detail.get('end_time')}</span> */}
                            <span>15 April 2015</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.where}>
                <p className={styles.title}>where</p>
                <dl className={styles.panel}>
                    <dt className={styles.location}>{detail.get('location')}</dt>
                    <dd className={styles.locationDetail}>{detail.get('location_detail')}</dd>
                    <dd className={styles.img}/>
                </dl>
            </section>
        </section>
    )
}

export default WhenWhere