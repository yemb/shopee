import React, { Component } from 'react'
import moment from 'moment'
import Header from './../../components/header'
import {Redirect} from 'react-router-dom'
import Title from './components/title'
import Bookmark from './components/bookmark'
import Content from './components/content'
import Participant from './components/participant'
import Comments from './components/comment'
import Footer from './components/footer'
import { connect } from 'react-redux'
import {
  getParticipants,
  getLikes,
  getComments,
  participate,
  cancelLike,
  cancelParticipate,
  like,
  submitComment
} from '../../util/api'

class Detail extends Component {
    state = {
      participants: [],
      likes: [],
      comments: []
    }
    elementRefs=[]
    componentDidMount () {
      const activityId = this.props.match.params.id
      // 避免多个没有相关性的请求因await导致请求串行，还是使用promise并行请求
      /* const {users:participants} = await getParticipants(activityId);
        const {users:likes}= await getLikes(activityId);
        const {comments}=await getComments(activityId)
        this.setState({
            participants,
            likes,
            comments
        }) */

      getParticipants(activityId).then(resp => {
        this.setState({
          participants: resp.users
        })
      })
      getLikes(activityId).then(resp => {
        this.setState({
          likes: resp.users
        })
      })
      getComments(activityId).then(resp => {
        this.setState({
          comments: resp.comments
        })
      })
    }

    setRef=(refKey, refElement) => {
      this.elementRefs[refKey] = refElement
    }

    onClickBookmark=(mark) => {
      let str = ''
      switch (mark) {
        case 'DETAIL':
          str = 'contentRef'
          break
        case 'PARTICIPANT':
          str = 'participantRef'
          break
        case 'COMMENT':
          str = 'commentsRef'
          break
      }
      this.elementRefs[str].scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }

    toggleParticipantStatus=async () => {
      const {activities, currentActivityId} = this.props
      const activityId = this.props.match.params.id
      const activity = activities.find(a => a.id === currentActivityId)
      if (activity.me_going) {
        await cancelParticipate(activityId)
      } else {
        await participate(activityId)
      }
      const {users: participants} = await getParticipants(activityId)
      this.setState({
        participants
      })
      this.props.dispatch({
        type: 'MODIFY_ACTIVITY',
        payload: {
          activityId,
          key: 'me_going',
          value: !activity.me_going
        }
      })
    }

    toggleLikeStatus=async () => {
      const {activities, currentActivityId} = this.props
      const activityId = this.props.match.params.id
      const activity = activities.find(a => a.id === currentActivityId)
      if (activity.me_likes) {
        await cancelLike(activityId)
      } else {
        await like(activityId)
      }
      const {users: likes} = await getLikes(activityId)
      this.setState({
        likes
      })
      this.props.dispatch({
        type: 'MODIFY_ACTIVITY',
        payload: {
          activityId,
          key: 'me_likes',
          value: !activity.me_likes
        }
      })
    }

    submitComment=async (comment) => {
      const activityId = this.props.match.params.id

      await submitComment(activityId, comment)
      const {comments} = await getComments(activityId)
      this.setState({
        comments
      })
      this.elementRefs['commentsRef'].scrollIntoView({ block: 'end', behavior: 'smooth' })
    }

    render () {
      const {activities, currentActivityId} = this.props

      if (activities.length === 0 || currentActivityId === undefined) {
        return (
          <Redirect to='/' />
        )
      }

      const activity = activities.find(a => a.id === currentActivityId)
      return (
        <div>
          <div onClick={() => {
            // header区域其他点击发生，去到其他界面时，清空currentActivityId
            this.props.dispatch({
              type: 'CLICK_ACTIVITY'
            })
          }}>
          <Header />
          </div>

            <Title
            channelName={activity.channel.name}
            title={activity.name}
            avatar={activity.creator.avatar}
            username={activity.creator.username}
            date={moment(activity.create_time).startOf('day').fromNow()}
          />
          <Bookmark onClickBookmark={this.onClickBookmark} />
          <Content
            setRef={this.setRef}
            images={activity.images}
            description={activity.description}
            begin_time={activity.begin_time}
            end_time={activity.end_time}
            location={activity.location}
            location_detail={activity.location_detail}
          />
          <Participant setRef={this.setRef} participants={this.state.participants} likes={this.state.likes} />
          <Comments setRef={this.setRef} comments={this.state.comments} />
          <Footer
            me_going={activity.me_going}
            me_likes={activity.me_likes}
            onTouchJoin={this.toggleParticipantStatus}
            onTouchLike={this.toggleLikeStatus}
            onSubmitComment={this.submitComment}
          />
        </div>

      )
    }
}x

const mapStateToProps = ({ list }) => {
  return {
    activities: list.activities,
    currentActivityId: list.currentActivityId
  }
}

export default connect(
  mapStateToProps
)(Detail)
