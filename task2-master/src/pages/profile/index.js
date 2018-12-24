import React, { Component } from 'react'
import styles from './index.css'
import Header from './../../components/header'
import {connect} from 'react-redux'
import {getMyActivities} from './../../util/api'
import ListView from './../../components/listview'
class Profile extends Component {
    state = {
      tab: 'liked',
      liked: [],
      likedHasMore: true,
      going: [],
      goingHasMore: true,
      past: [],
      pastHasMore: true
    }

    componentDidMount () {
      this.props.dispatch({
        type: 'GET_PROFILE'
      })

      getMyActivities({type: 'liked', limit: 10}).then(resp => {
        this.setState({
          liked: resp.events,
          likedHasMore: resp.events.length > 10
        })
      })

      getMyActivities({type: 'going', limit: 10}).then(resp => {
        this.setState({
          going: resp.events,
          goingHasMore: resp.events.length > 10
        })
      })

      getMyActivities({type: 'past', limit: 10}).then(resp => {
        this.setState({
          past: resp.events,
          pastHasMore: resp.events.length > 10
        })
      })
    }

    toggleTab=(tab) => {
      this.setState({tab})
    }

    loadMore = () => {
      if (this.state.tab === 'liked' && this.state.likedHasMore) {
        getMyActivities({type: 'liked', limit: 10}).then(resp => {
          this.setState({
            liked: [...this.state.liked, ...resp.events],
            likedHasMore: resp.events.length > 10
          })
        })
      }

      if (this.state.tab === 'going' && this.state.goingHasMore) {
        getMyActivities({type: 'going', limit: 10}).then(resp => {
          this.setState({
            going: [...this.state.going, ...resp.events],
            goingHasMore: resp.events.length > 10
          })
        })
      }

      if (this.state.tab === 'past' && this.state.pastHasMore) {
        getMyActivities({type: 'past', limit: 10}).then(resp => {
          this.setState({
            past: [...this.state.liked, ...resp.events],
            pastHasMore: resp.events.length > 10
          })
        })
      }
    }

    onItemTouch = (activity) => {
      this.props.dispatch({
        type: 'CLICK_ACTIVITY',
        payload: activity.id
      })
      this.props.history.push(`/detail/${activity.id}`)
    }
    render () {
      const {profile, currentActivityId} = this.props
      return (
        <div className={styles.container}>
          <Header />

          <div className={styles.profile}>

            <div style={{textAlign:'center',marginBottom:'10px'}}
              onClick={() => { this.props.dispatch({
                  type:'SET_LANGUAGE',
                }) ;
                //示例作用，调往login
                this.props.history.push('/login')
              }}
            >
              toggle language setting
            </div>
            <img className={styles.profileAvatar} src={profile.avatar} />
            <p className={styles.profileUsername}>{profile.username}</p>
            <p className={styles.profileEmail}>{profile.email}</p>

          </div>

          <div className={styles.bookmarkContainer}>
            <a
              className={this.state.tab === 'liked' ? styles.listsActive : styles.lists}
              onClick={() => { this.toggleTab('liked') }}
            >
              {`${profile.likes_count} Likes`}
            </a>
            <a
              className={this.state.tab === 'going' ? styles.goingActive : styles.going}
              onClick={() => { this.toggleTab('going') }}

            >
              {`${profile.goings_count} Going`}
            </a>
            <a
              className={this.state.tab === 'past' ? styles.pastActive : styles.past}
              onClick={() => { this.toggleTab('past') }}

            >
              {`${profile.past_count} Past`}
            </a>
          </div>

          <div className={styles.tabContainer}>
            <div style={this.state.tab === 'liked' ? { display: 'block'} : { display: 'none'}}>
              <ListView list={this.state.liked} onReachEnd={this.loadMore} onItemTouch={this.onItemTouch} currentActivityId={currentActivityId} />
            </div>
            <div style={this.state.tab === 'going' ? { display: 'block'} : { display: 'none'}}>
              <ListView list={this.state.going} onReachEnd={this.loadMore} onItemTouch={this.onItemTouch} currentActivityId={currentActivityId} />
            </div>
            <div style={this.state.tab === 'past' ? { display: 'block'} : { display: 'none'}}>
              <ListView list={this.state.past} onReachEnd={this.loadMore} onItemTouch={this.onItemTouch} currentActivityId={currentActivityId} />
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = ({ user, list }) => {
  return {
    profile: user.user,
    currentActivityId: list.currentActivityId
  }
}

export default connect(
  mapStateToProps
)(Profile)
