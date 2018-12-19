import * as React from 'react';
import * as styles from './style.css'

const toast = (props: any) => {
    const { message } = props
    return (
        <div className={styles.message}>
            <i>
                <span className={styles.icon}/>
            </i>
            <p className={styles.text}>{message}</p>
        </div>
    )
}

export default toast