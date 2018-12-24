import React, { PureComponent } from 'react'
import styles from './listview.css'

import ListItem from './listitem'
class ListView extends PureComponent {
    state = {
      visibleRows: []
    }
    elements = []
    componentDidMount () {
      // 从活动详情界面，回到列表界面时，将该项活动移动到列表首位。为解决前后几个元素的延迟渲染，将前后几个元素立即渲染
      const {list, currentActivityId} = this.props
      if (currentActivityId !== undefined && list.length) {
        const index = list.findIndex(l => l.id === currentActivityId)
        let tmp = [...this.state.visibleRows]

        let start = index - 3 >= 0 ? index - 3 : 0
        let end = index + 3 < tmp.length ? index + 3 : tmp.length
        for (let i = start; i < end; i++) {
          tmp[i] = true
        }
        this.setState({ visibleRows: tmp })
        this.elements[index] && this.elements[index].scrollIntoView()
      }
    }

    static getDerivedStateFromProps (nextProps, prevState) {
      if (nextProps.list.length > prevState.visibleRows.length) {
        let tmp = []
        for (let i = 0; i < nextProps.list.length - prevState.visibleRows.length; i++) {
          tmp[i] = false
        }
        return {
          visibleRows: prevState.visibleRows.concat(tmp)
        }
      }
      return null
    }

    componentWillUnmount () {
      this.intersectionObserver.disconnect()
    }

    intersectionObserver = new IntersectionObserver(
      entries => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].intersectionRatio <= 0) return

          const index = entries[i].target.getAttribute('data-index')
          let tmp = [...this.state.visibleRows]
          tmp[index] = true
          this.setState({ visibleRows: tmp })

          if (Number.parseInt(index) === tmp.length - 1) {
            this.onReachEnd()
          }
          this.intersectionObserver.unobserve(entries[i].target)
        }
      });

    onReachEnd = () => {
      this.props.onReachEnd && this.props.onReachEnd()
    }

    onItemTouch = (item) => {
      this.props.onItemTouch && this.props.onItemTouch(item)
    }

    observer=ref => {
      if (ref) {
        this.elements[ref.getAttribute('data-index')] = ref
        this.intersectionObserver.observe(ref)
      }
    }

    render () {
      const {
        list = [],
        renderEmpty
      } = this.props

      return (
        <div className={styles.container}>
          {
            list.length > 0
              ? list.map((item, index) => {
                return (
                  <div key={index} data-index={index} ref={this.observer} className={styles.wrapper}>
                    {this.state.visibleRows[index] && <ListItem data={item} onTouch={this.onItemTouch} />}
                  </div>
                )
              })
              : renderEmpty ? renderEmpty() : (
                <div className={styles.empty}>
                  <p className={styles.emptyText}>No activity found</p>
                </div>
              )
          }
        </div>
      )
    }
}

export default ListView
