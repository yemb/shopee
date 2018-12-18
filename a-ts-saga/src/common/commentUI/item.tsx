import * as React from 'react';
import * as styles from './style.css'

import * as time from '@/util/time'

const CommentItem = (props: any) => {
    const {comment} = props
    return (
        <section className={styles.itemWrapper}>
        <img src={comment.get('user').get('avatar')} alt="" className={styles.left}/>
        <div className={styles.right}>
            <div className={styles.top}>
                <p className={styles.username}>
                    {comment.get('user').get('username')}
                    <span className={styles.time}>
                        {time.commentTime(comment.get('create_time'))}
                    </span>
                </p>
                <i>
                    <span className={styles.reply} />
                </i>
            </div>
            <p className={styles.bottom}>
                {comment.get('comment')}
            </p>
        </div>
        </section>
    );
}

export default CommentItem;
