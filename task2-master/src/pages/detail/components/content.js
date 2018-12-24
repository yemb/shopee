import React, {Component} from 'react'
import moment from 'moment'
import styles from './content.css'
const format = 'D MMMM YYYY h:mm a'

class Content extends Component {
    state = {
      isExpended: false
    }

    toggleExpendedStatus = () => {
      this.setState({
        isExpended: !this.state.isExpended
      })
    }

    render () {
      const {
        images = [],
        description = '',
        begin_time = '',
        end_time = '',
        location = '',
        location_detail = '',
        setRef = () => {}
      } = this.props
      const start = moment(begin_time).format(format).split(' ')
      const end = moment(end_time).format(format).split(' ')
      return (
        <div ref={(ref) => { setRef('contentRef', ref) }} className={styles.container}>
          {
            images.length > 0 ? (
              <div className={styles.imgOutterContainer}>
                <div className={styles.imgInnerContainer}>
                  {
                    images.map((item, index) => {
                      return (
                        <img alt='' key={index} src={item} className={styles.imgItem} />
                      )
                    })
                  }
                </div>
              </div>
            ) : null
          }

          <div className={styles.contentContainer}>
            <p className={styles.content}>
              {(description.length > 300 && !this.state.isExpended)
                ? `${description.substring(0, 301)}...`
                : description
              }
            </p>
            {(description.length > 300 && !this.state.isExpended)
              ? (
                <div className={styles.contentMask}>
                  <a
                    onClick={this.toggleExpendedStatus}
                    className={styles.maskButton}
                  >
                                    VIEW ALL
                  </a>
                </div>
              )
              : null
            }
          </div>

          <div className={styles.whenContainer}>
            <p className={styles.label}>When</p>
            <div style={{display: 'flex'}}>
              <div className={styles.whenContent}>
                <p className={styles.dateFrom}>{moment(begin_time).format('DD MM YYYY')}</p>
                <div className={styles.whenTime}>
                  <span>{start[3]}</span>
                  <span>{start[4]}</span>
                </div>
              </div>
              <div className={styles.whenContent}>
                <p className={styles.dateTo}>{moment(end_time).format('DD MM YYYY')}</p>
                <div className={styles.whenTime}>
                  <span>{end[3]}</span>
                  <span>{end[4]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.whereContainer}>
            <p className={styles.label}>Where</p>
            <p className={styles.address}>{location}</p>
            <p className={styles.addressDetail}>{location_detail}</p>
          </div>
        </div>
      )
    }
}

export default Content
