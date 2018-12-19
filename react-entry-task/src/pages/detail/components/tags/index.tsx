import * as React from 'react'
import * as styles from './style.css'

const Tags = (props: any) => {
    const {status, toggleStatus} = props
    return (
        <ul className={status==='details' ? styles.wrapper : styles.wrapperFixed}>
        {
            status === 'details' ?
            (
                <li>
                    <i><span className={styles.detailActive}/></i>
                    <span className={styles.textActive}>detail</span>
                </li>
            ) :
            (
                <li onClick={() => toggleStatus('details')}>
                    <i><span className={styles.detail}/></i>
                    <span className={styles.text}>detail</span>
                </li>
            )
        }

        {
            status === 'participants' ?
            (
                <li>
                    <i><span className={styles.participantsActive}/></i>
                    <span className={styles.textActive}>participants</span>
                </li>
            ) :
            (
                <li onClick={()=>toggleStatus('participants')}>
                    <i><span className={styles.participants}/></i>
                    <span className={styles.text}>participants</span>
                </li>
            )
        }

        {
            status === 'comments' ?
            (
                <li>
                    <i><span className={styles.commentsActive}/></i>
                    <span className={styles.textActive}>comments</span>
                </li>
            ) :
            (
                <li onClick={()=>toggleStatus('comments')}>
                    <i><span className={styles.comments}/></i>
                    <span className={styles.text}>comments</span>
                </li>
            )
        }
            
    
        </ul>
    )
}

export default Tags