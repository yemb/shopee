import * as React from 'react'
import * as styles from './style.css'

const GoingLike = (props: any) => {
    const { detail, goingList, likeList, oversize1, oversize2, buttonClick, small} = props
    return (
        <section className={styles.wrapper}>
            <section className={small && !oversize1 ? styles.panel : styles.panelOversize}>
                <div className={styles.goinglike}>
                    {
                        detail.get('me_going') ?
                        (
                            <span>
                            <i><span className={styles.megoing}/></i>
                            <span className={styles.mine}>i'm going</span>
                            </span>  
                        ) : (
                            <span>
                            <i><span className={styles.goingIcon} /></i>
                            <span className={styles.notMine}>{detail.get('goings_count')}Going</span>
                            </span>
                        )
                    }
                </div>
                <ul className={styles.goingList}>
                    {
                        goingList.map((user: any) => {
                            return (
                                <li key={user.get('id')}>
                                    <img src={user.get('avatar')}/>
                                </li>
                            )
                        })
                    }
                    {
                        goingList.size > 7 && small?
                        (
                            <li onClick={()=>{buttonClick(1)}} className={styles.getMore}>
                                {   !oversize1 ? 
                                    (
                                            <div className={styles.test} /> 
                                    ):
                                    (
                                            <div className={styles.active} />
                                    )
                                }
                            </li>
                        ) :
                        <></>
                    }
                    
                    
                </ul>
            </section>

            {/* 下面是likes */}

            <section className={ small&&!oversize2 ? styles.panel: styles.panelOversize}>
                <div className={styles.goinglike}>
                    {
                        detail.get('me_likes') ?
                        (
                            <span>
                            <i><span className={styles.megoing}/></i>
                            <span className={styles.mine}>i like it</span>
                            </span>  
                        ) : (
                            <span>
                            <i><span className={styles.goingIcon} /></i>
                            <span className={styles.notMine}>{detail.get('likes_count')}Likes</span>
                            </span>
                        )
                    }
                </div>
                <ul className={styles.goingList}>
                    {
                        likeList.map((user: any) => {
                            if(!user) {
                                return (
                                    <></>
                                )
                            }
                            return (
                                <li key={user.get('id')}>
                                    <img src={user.get('avatar')}/>
                                </li>
                            )
                        })
                    }
                    {
                        likeList.size > 7 && small ? 
                        (<li onClick={()=>{buttonClick(2)}} className={styles.getMore}>
                            {   !oversize2 ?
                                (
                                        <div className={styles.test} /> 
                                ):
                                (
                                        <div className={styles.active} />
                                )
                            }
                        </li>) :
                        <></>
                    }
                    
                    
                </ul>
            </section>
        </section>
    )
}


export default GoingLike