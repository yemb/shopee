import * as React from 'react';
import * as styles from  './style.css';
import { connect } from 'react-redux';

import { actionCreators } from './store';
import Header from '@/common/header'
import ListUI from '@/common/listUI'
import Nothing from '@/common/nothing'

class Me extends React.Component<any> {
  public render() {
    const {
        status, 
        toggleStatus,
        likeList,
        goingList,
        pastList,
        myInfo,
        success
    } = this.props
    console.log('myInfo',myInfo)
    const nowEvent = () => {
        if(status === 'liked') {
            return likeList
        }
        if(status === 'going') {
            return goingList
        }
        if(status === 'past') {
            return pastList
        }
    }
    if( !success) {
        return (
            <></>
        )
    } else {
        return (
        <section className={styles.meWrapper}>
            <Header isHome={false}/>
            <section className={styles.content}>
            {/* ******************************************************************card */}
            <div className={styles.card}>
                <div className={styles.avatar}>
                <img src={myInfo.get('avatar')} className={styles.avatarImg} />
                </div>
                <p className={styles.username}>{myInfo.get('username')}</p>
                <div className={styles.email}>
                <i><span className={styles.emailIcon} /></i>
                <p className={styles.emailText}>{myInfo.get('email')}</p>
                </div>
            </div>

            {/* ****************************************************************** tag */}
            <ul className={styles.wrapper}>
            {
                status === 'liked' ?
                (
                    <li>
                        <i><span className={styles.likedActive}/></i>
                        <span className={styles.textActive}>liked</span>
                    </li>
                ) :
                (
                    <li onClick={() => toggleStatus('liked')}>
                        <i><span className={styles.liked}/></i>
                        <span className={styles.text}>liked</span>
                    </li>
                )
            }

            {
                status === 'going' ?
                (
                    <li>
                        <i><span className={styles.goingActive}/></i>
                        <span className={styles.textActive}>going</span>
                    </li>
                ) :
                (
                    <li onClick={()=>toggleStatus('going')}>
                        <i><span className={styles.going}/></i>
                        <span className={styles.text}>going</span>
                    </li>
                )
            }

            {
                status === 'past' ?
                (
                    <li>
                        <i><span className={styles.pastActive}/></i>
                        <span className={styles.textActive}>past</span>
                    </li>
                ) :
                (
                    <li onClick={()=>toggleStatus('past')}>
                        <i><span className={styles.past}/></i>
                        <span className={styles.text}>past</span>
                    </li>
                )
            }
            </ul>
            </section>
            <section className={styles.list}>
            {
                nowEvent().size ?
                <ListUI events={nowEvent()} hasMore={false} loading={true} identify="me"/> :
                <Nothing status='me'/>
            }
            </section>
        </section>
        );  
                
    }
  }
  public componentDidMount() {
    this.props.getTypeList('liked')
    this.props.getMyInfo()
  }
}

const mapStateToProps = (state: any) => {
  return {
    status: state.getIn(['me','status']),
    likeList: state.getIn(['me', 'likeList']),
    goingList: state.getIn(['me', 'goingList']),
    pastList: state.getIn(['me', 'pastList']),
    myInfo: state.getIn(['me', 'myInfo']),
    success: state.getIn(['me', 'success'])
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleStatus (value: any) {
        dispatch(actionCreators.getTypeList(value))
        dispatch(actionCreators.toggleStatus(value))
    },
    getTypeList (type: any) {
        console.log('getlist in me')
        dispatch(actionCreators.getTypeList(type))
    },
    getMyInfo() {
        dispatch(actionCreators.getMyInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);