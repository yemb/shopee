import React, {Component} from 'react'
import styles from './bookmark.css'

class Bookmark extends Component {
    state = {
      tab: ''
    }

    render () {
      const {
        onClickBookmark = () => {
        }
      } = this.props

      return (
        <div className={styles.container}>
          <a
            className={this.state.tab === 'DETAIL' ? styles.detailActive : styles.details}
            onClick={() => {
              onClickBookmark('DETAIL')
              this.setState({tab: 'DETAIL'})
            }}
          >
                    Details
          </a>
          <a
            className={this.state.tab === 'PARTICIPANT' ? styles.participantsActive : styles.participants}
            onClick={() => {
              onClickBookmark('PARTICIPANT')
              this.setState({tab: 'PARTICIPANT'})
            }}
          >
                    Participants
          </a>
          <a
            className={this.state.tab === 'COMMENT' ? styles.commentsActive : styles.comments}
            onClick={() => {
              onClickBookmark('COMMENT')
              this.setState({tab: 'COMMENT'})
            }}
          >
                    Comments
          </a>
        </div>
      )
    }
}

export default Bookmark
