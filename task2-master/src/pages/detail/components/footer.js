import React, {Component} from 'react'
import styles from './footer.css'

class Footer extends Component {
    state = {
      inputVisible: false,
      input: ''
    }

    toggleInputStatus = () => {
      this.setState({
        inputVisible: !this.state.inputVisible
      })
    }

    render () {
      return (
        <div className={styles.container}>
          {this.state.inputVisible
            ? this.renderInput()
            : this.renderFooter()
          }
        </div>
      )
    }

    submit=() => {
      const {
        onSubmitComment = () => {}
      } = this.props
      if (this.state.input.length > 0) {
        this.setState({input: ''})
        onSubmitComment(this.state.input)
      }
    }

    renderInput=() => {
      return (
        <div className={styles.inputContainer}>
          <a
            className={styles.close}
            onClick={this.toggleInputStatus}
          >
                    close
          </a>
          <div className={styles.inputWrapper}>
            <input
              placeholder='Leave your comment here'
              className={styles.input}
              onChange={(event) => {
                this.setState({
                  input: event.target.value
                })
              }}
              value={this.state.input}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.submit()
                }
              }}
            />
          </div>
          <a
            className={styles.send}
            onClick={this.submit}
          >
                    send
          </a>
        </div>
      )
    }

    renderFooter = () => {
      const {
        onTouchJoin = () => {},
        onTouchLike = () => {},
        me_going = false,
        me_likes = false

      } = this.props
      return (
        <div>
          <a
            className={styles.comment}
            onClick={this.toggleInputStatus}
          >
                    comment
          </a>
          <a
            className={me_likes ? styles.liked : styles.like}
            onClick={onTouchLike}
          >
                    like
          </a>
          <a
            className={me_going ? styles.joined : styles.join}
            onClick={onTouchJoin}
          >
            {me_going ? "I'm Going" : 'Join'}
          </a>
        </div>
      )
    }
}

export default Footer
