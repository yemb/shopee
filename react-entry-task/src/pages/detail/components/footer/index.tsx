import * as React from 'react'
import * as styles from './style.css'

import { connect } from 'react-redux'
import { actionCreators } from '@/pages/detail/store';

const Footer = (props: any) => {
    const { 
        status,
        detail,
        toggleGoing,
        toggleLike, 
        toggleStatus,
        clearCommentInput,
        commentInput,
        changeCommentInput,
        sendComment
    } = props
    if(status) {
        return (
            <section className={styles.footerWrapper}>
                <div className={styles.left}>
                    <i onClick={toggleStatus}>
                        <span className={styles.commentIcon} />
                    </i>
                    {
                            detail.get('me_likes') ? 
                            (
                                <i onClick={()=>toggleLike(true, detail.get('id'))}>
                                    <span className={styles.likeIcon}/> 
                                </i>
                            ):
                            (
                                <i onClick={()=>toggleLike(false, detail.get('id'))}>
                                    <span className={styles.notLikeIcon} />
                                </i>
                            )
                    }
                </div>
                
                {
                    detail.get('me_going') ?
                    (
                        <div className={styles.right} onClick={()=>toggleGoing(true, detail.get('id'))}>
                            <i><span className={styles.goingIcon} /></i>
                            <span className={styles.goingText}>I am going</span>
                        </div>
                    ):
                    (
                        <div className={styles.right} onClick={()=>toggleGoing(false, detail.get('id'))}>
                            <i><span className={styles.notGoingIcon} /></i>
                            <span className={styles.NotGoingText}>JOIN</span>
                        </div>

                    )
                }
                    
            </section>
        )
    } else {
        return (
            <section className={styles.footerWrapper}>
                <i className={styles.cross} onClick={clearCommentInput}>
                    <span className={styles.crossIcon}/>
                </i>
                <input 
                    type="text" 
                    className={styles.comment} 
                    placeholder="Leave your comment here" 
                    maxLength={40} 
                    value={commentInput}
                    onChange={changeCommentInput}
                />
                <div className={styles.send} onClick={()=>sendComment(detail.get('id'), commentInput)}>
                    <span className={styles.sendIcon} />
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        toggleGoing(status: any, id: any) {
            console.log('toggleGoing')
            if(status) {
                dispatch(actionCreators.deleteGoing(id))
            } else {
                console.log('toggleGoing in footer')
                dispatch(actionCreators.addGoing(id))
            }
        },
        toggleLike(status: any, id: any) {
            console.log('toggleLike')
            if(status) {
                dispatch(actionCreators.deleteLike(id))
            } else {
                dispatch(actionCreators.addLike(id))
            }
        },
        sendComment(id: any, commentInput: string) {
            if(commentInput.trim() !== '') {
                dispatch(actionCreators.sendComment(id, commentInput))
            }
            dispatch(actionCreators.getCommentList(id))
        }
    }
}

export default connect(null,mapDispatchToProps)(Footer)