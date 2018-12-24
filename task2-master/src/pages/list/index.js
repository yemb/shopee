import React, { Component } from 'react'
import styles from './index.css'
import Search from './components/search'
import Header from './../../components/header'

import ListView from './../../components/listview'
import { connect } from 'react-redux'

class List extends Component {
    state = {
      showSearchMenu: false,
      channels: undefined,
      before: undefined,
      after: undefined,
      selectedDate: undefined
    }

    toggleSearchMenuStatus=() => {
      this.setState({
        showSearchMenu: !this.state.showSearchMenu
      })
    }

    componentDidMount () {
      const {activities} = this.props
      if (activities.length === 0) {
        this.props.dispatch({
          type: 'GET_ACTIVITIES',
          payload: {
            offset: 0
          }
        })
        this.props.dispatch({
          type: 'GET_CHANNELS'
        })
      }
    }

    onSearch = (params, selectedDate) => {
      this.toggleSearchMenuStatus()
      params.offset = 0
      params.limit = 9999// 现在events接口不返回数据集的总数，统计展示区域又需要，这里简单处理下
      this.setState({
        channels: params.channels,
        before: params.before,
        after: params.after,
        selectedDate: selectedDate
      })
      this.props.dispatch({
        type: 'GET_ACTIVITIES',
        payload: params
      })
    }

    clearSearch=() => {
      this.setState({
        channels: undefined,
        before: undefined,
        after: undefined,
        selectedDate: undefined
      })
      this.props.dispatch({
        type: 'GET_ACTIVITIES',
        payload: {
          offset: 0
        }
      })
    }

    loadMore = () => {
      if (this.props.hasMore) {
        let query = {}
        if (this.state.channels !== undefined) {
          query.channels = this.state.channels
        }
        if (this.state.before !== undefined) {
          query.before = this.state.before
        }
        if (this.state.after !== undefined) {
          query.after = this.state.after
        }
        this.props.dispatch({
          type: 'GET_ACTIVITIES',
          payload: query
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
      const {channels, activities, currentActivityId} = this.props

      const isSearchingNow = this.state.channels !== undefined || this.state.before !== undefined || this.state.after !== undefined
      const channel = channels.find(c => c.id === this.state.channels)
      let searchTitle = 'Searched for ALL Activities'
      if (channel) {
        searchTitle = `Searched for ${channel.name} Activities`
      }

      if (this.state.selectedDate) {
        searchTitle += ` , ${this.state.selectedDate}`
      }
      return (
        <div className={styles.outterContainer}>
          <div className={styles.innerContainer}>
            <div className={this.state.showSearchMenu ? styles.searchShow : styles.search}>
              <Search channels={channels} onSearch={this.onSearch} />
            </div>
            <div className={styles.main}>
              <div onClick={() => {
                // header区域其他点击发生，去到其他界面时，清空currentActivityId
                this.props.dispatch({
                  type: 'CLICK_ACTIVITY'
                })
              }}>
                <Header renderLeft={() => {
                  return (
                    <a
                      className={styles.searchButton}
                      onClick={this.toggleSearchMenuStatus}
                    >
                                        搜索
                    </a>
                  )
                }} />
              </div>

              {
                isSearchingNow ? (
                  <div className={styles.searchResult}>
                    <span className={styles.resultTotal}>{`${activities.length} Results`}</span>
                    <a
                      className={styles.clearSearch}
                      onClick={this.clearSearch}
                    >
                                        CLEAR SEARCH
                    </a>
                    <p className={styles.resultTitle}>{searchTitle}</p>
                  </div>
                ) : null
              }

              <div className={styles.listContainer}>
                <ListView list={activities} onReachEnd={this.loadMore} onItemTouch={this.onItemTouch} currentActivityId={currentActivityId} />
              </div>
              {this.state.showSearchMenu && <div onClick={this.toggleSearchMenuStatus} className={styles.mask} />}

            </div>
          </div>
        </div>

      )
    }
}

const mapStateToProps = ({ list }) => {
  return {
    channels: list.channels,
    activities: list.activities,
    hasMore: list.hasMore,
    status: list.status,
    currentActivityId: list.currentActivityId
  }
}

export default connect(
  mapStateToProps
)(List)
