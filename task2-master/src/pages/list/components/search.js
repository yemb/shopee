import React, { Component } from 'react'
import styles from './search.css'
import {getStartOfThisDay} from './../../../util/helper'
const dates = ['Anytime', 'Today', 'Tomorrow', 'This Week', 'This Month']
class Search extends Component {
    state = {
      selectedDate: undefined,
      selectedChannelId: undefined
    }

    search=() => {
      if (this.state.selectedDate === undefined && this.state.selectedChannelId === undefined) {
        return
      }
      let query = {}
      if (this.state.selectedDate !== undefined) {
        let start
        let end
        switch (this.state.selectedDate) {
          case 'Today':
            start = getStartOfThisDay(new Date())
            end = start.addDays(1)
            break
          case 'Tomorrow':
            start = getStartOfThisDay(new Date()).addDays(1)
            end = getStartOfThisDay(new Date()).addDays(2)
            break
          case 'This Week':
            start = getStartOfThisDay(new Date()).addDays(-new Date().getDay() + 1)
            end = start.addDays(7)
            break
          case 'This Month':
            start = getStartOfThisDay(new Date()).addDays(-new Date().getDate() + 1)
            end = start.addMonth(1)
            break
          default:
            start = undefined
            end = undefined
            break
        }
        if (start !== undefined && end !== undefined) {
          query.before = +end
          query.after = +start
        }
      }
      if (this.state.selectedChannelId !== undefined && this.state.selectedChannelId !== 'ALL') {
        query.channels = this.state.selectedChannelId
      }
      this.props.onSearch && this.props.onSearch(query, this.state.selectedDate)
    }

    render () {
      const {channels} = this.props
      let subTitle = ''

      if (this.state.selectedChannelId !== undefined) {
        let channel = channels.find(c => c.id === this.state.selectedChannelId)
        subTitle = channel ? channel.name : 'All activities'
      }
      if (this.state.selectedDate !== undefined) {
        subTitle += ' ' + this.state.selectedDate
      }

      return (
        <div className={styles.search}>
          <div className={styles.container}>
            <div className='channel'>
              <p className={styles.title}>Date</p>
              <ul className={styles.list}>

                {dates.map((item, index) => {
                  return (
                    <li
                      className={item === this.state.selectedDate ? styles.selected : null}
                      key={index}
                      onClick={() => {
                        this.setState({
                          selectedDate: this.state.selectedDate === item ? undefined : item
                        })
                      }}
                    >
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='channel'>
              <p className={styles.title}>CHANNEL</p>
              <ul className={styles.list}>
                <li
                  className={this.state.selectedChannelId === 'ALL' ? styles.selected : null}
                  onClick={() => {
                    this.setState({
                      selectedChannelId: this.state.selectedChannelId === 'ALL' ? undefined : 'ALL'
                    })
                  }}
                >
                                ALL
                </li>
                {channels.map((item, index) => {
                  return (
                    <li
                      className={this.state.selectedChannelId === item.id ? styles.selected : null}
                      key={index}
                      onClick={() => {
                        this.setState({
                          selectedChannelId: this.state.selectedChannelId === item.id ? undefined : item.id
                        })
                      }}
                    >
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <a
            onClick={this.search}
            className={
              this.state.selectedDate === undefined && this.state.selectedChannelId === undefined
                ? styles.disable : styles.submit
            }>
            <p className={styles.title1}>Search</p>
            <p className={styles.title2}>{subTitle}</p>
          </a>
        </div>

      )
    }
}

export default Search
