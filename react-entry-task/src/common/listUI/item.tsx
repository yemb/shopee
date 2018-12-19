import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as time from '@/util/time'
import * as styles from './style.css'
import { actionCreators } from '@/pages/list/store';

const ListItem = (props:any) => {
  const { event,toggleGoing, toggleLike , identify} = props
  if(identify==='list') {
    return (
      <section className={styles.item}>
        <Link to={'/detail/'+ event.id}>
          <div className={styles.top}>
            <img src={event.creator.avatar} alt="" className={styles.avatar}/>
            <span className={styles.userName}>{event.creator.username}</span>
            <button className={styles.channelName}>{event.channel.name}</button>
          </div>
          <p className={styles.title}>{event.name}</p>
          <div className={styles.date}>
            <span className={styles.dateIcon} />
            <span className={styles.dateText}>{time.listTime(event.begin_time)} - {time.listTime(event.end_time)}</span>
          </div>
          <p className={styles.description}>
            {event.description}
          </p>
        </Link>

        <div className={styles.goinglike}>
        {
          event.me_going ?
          (
            <span onClick={()=>toggleGoing(true, event.id)}>
              <i><span className={styles.megoing} /></i>
              <span className={styles.mine}>i am going!</span>
            </span>  
          ) : (
            <span onClick={()=>toggleGoing(false, event.id)}>
              <i><span className={styles.goingIcon} /></i>
              <span className={styles.notMine}>{event.goings_count} Going</span>
            </span>
          )
        }
        {
          event.me_likes ? 
          (
            <span  onClick={()=>toggleLike(true, event.id)}>
              <i><span className={styles.melike} /></i>
              <span className={styles.mine}>i like it!</span>
            </span>  
          ) : (
            <span  onClick={()=>toggleLike(false, event.id)}>
              <i><span className={styles.likeIcon} /></i>
              <span className={styles.notMine}>{event.likes_count} Likes</span>
            </span>
          )
        }
            
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.item}>
        <Link to={'/detail/'+ event.get('id')}>
          <div className={styles.top}>
            <img src={event.get('creator').get('avatar')} alt="" className={styles.avatar}/>
            <span className={styles.userName}>{event.get('creator').get('username')}</span>
            <button className={styles.channelName}>{event.get('channel').get('name')}</button>
          </div>
          <p className={styles.title}>{event.get('name')}</p>
          <div className={styles.date}>
            <span className={styles.dateIcon} />
            <span className={styles.dateText}>{time.listTime(String(event.get('begin_time)')))} - {time.listTime(String(event.get('end_time')))}</span>
          </div>
          <p className={styles.description}>
            {event.get('description')}
          </p>
        </Link>

        <div className={styles.goinglike}>
        {
          event.get('me_going') ?
          (
            <span onClick={()=>toggleGoing(true, event.get('id'))}>
              <i><span className={styles.megoing} /></i>
              <span className={styles.mine}>i am going!</span>
            </span>  
          ) : (
            <span onClick={()=>toggleGoing(false, event.get('id'))}>
              <i><span className={styles.goingIcon} /></i>
              <span className={styles.notMine}>{event.get('goings_count')} Going</span>
            </span>
          )
        }
        {
          event.get('me_likes') ? 
          (
            <span  onClick={()=>toggleLike(true, event.get('id'))}>
              <i><span className={styles.melike} /></i>
              <span className={styles.mine}>i like it!</span>
            </span>  
          ) : (
            <span  onClick={()=>toggleLike(false, event.get('id'))}>
              <i><span className={styles.likeIcon} /></i>
              <span className={styles.notMine}>{event.get('likes_count')} Likes</span>
            </span>
          )
        }
            
        </div>
      </section>
    );
  }
  
}

const mapStateToProps = (state: any) => {
  return {
    // detail: state.getIn(['detail', 'detail']),
    // goingList: state.getIn(['detail', 'goingList']),
    // likeList: state.getIn(['detail', 'likeList'])
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleGoing(status: any, id: any) {
      if(status) {
        dispatch(actionCreators.deleteGoing(id))
      } else {
        dispatch(actionCreators.addGoing(id))
      }
    },
    toggleLike(status: any, id: any) {
      if(status) {
        dispatch(actionCreators.deleteLike(id))
      } else {
        dispatch(actionCreators.addLike(id))
      }
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListItem);
