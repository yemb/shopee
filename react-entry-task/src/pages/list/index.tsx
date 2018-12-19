import * as React from 'react';

import Header from '@/common/header'
import ListUI from '@/common/listUI/index'
import Btn from '@/common/button'
import Nothing from '@/common/nothing'
import * as time from '@/util/time'

import * as styles from './style.css'
// import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';

class List extends React.Component<any> {
  public handleScroll() {
    console.log('handlescroll')
  }
  public render() {
    const { 
      events,
      searchState, 
      channels, 
      toggleSearch, 
      dates, 
      activeDate, 
      activeChannel,
      filterChannel,
      toggleChannel,
      toggleDate,
      hasMore,
      getEventsBySearch,
      clearSearch,
      success,
      haveSearch,
      page
    } = this.props
    
    const ifSearchActive = ()=> {
      return activeDate || activeChannel
    }

    const searchClick = () => {
      filterChannel(!searchState)
      if(activeChannel || activeDate) {
        getEventsBySearch(activeChannel, activeDate)
      }
    }

    const getActiveChannelName = () => {
      let result = 'all'
      channels.forEach((ele:any) => {
        // console.log(ele.get('id'),activeChannel)
        if(ele.get('id') === activeChannel) {
          result =  ele.get('name')
        }
      })
      return result
    }

    const clickSearch = () => {
      scrollTo(0,0)
      toggleSearch(!searchState, channels)
    }


    if(!success) {
      return (
        <></>
      )
    }else {
      return (
          <section className={!searchState ? styles.wrapper : styles.noScrollWrapper}>
            {/* *****
            *************************************** 侧边 搜索 *****************************************
            ***** */}
            <section className={searchState ? styles.searchWrapper : styles.notSearchWrapper}>
                <p className={styles.title}>DATE</p>
                <div className={styles.dates}>
                {
                  dates.map((item: any, index: any) => {
                    return <button className={item===activeDate ? styles.dateActive : styles.dateNotActive} key={index} onClick={()=>toggleDate(item)}>{item}</button>
                  })
                }
                </div>
                <p className={styles.title}>CHANNELS</p>
                <div className={styles.channels}>
                  {
                    channels.map((item: any) => {
                      return (
                        <div className={styles.channelItem} key={item.get('id')} onClick={()=>toggleChannel(item.get('id'))}>
                          <Btn value={item.get('name')} active={item.get('id') === activeChannel}/>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={ifSearchActive()? styles.footer : styles.footerNotActive}  onClick={searchClick}>
                  <div className={styles.lineOne}>
                    <span className={styles.footIcon}/>
                    <span className={styles.footTitle}>SEARCH</span>
                  </div>
                  {
                    ifSearchActive() ?
                    <div className={styles.lineTwo}>{ activeChannel ===100 || !activeChannel ? 'All activities' : 'channel'}</div> :
                    <></>
                  }
                </div>
            </section>
  
            {/* *****
            *************************************** list *****************************************
            ***** */}
            <section className={searchState ? styles.listWrapper : styles.notSearchlist}>
              <Header isHome={true} toggleSearch={clickSearch}/>

              {/* <div className={styles.notHeader}> */}
              {/* 搜索头 */}
              {
                haveSearch?
                (
                  <div className={styles.NoSearchWrapper}>
                      <div className={styles.top}>
                        <span className={styles.left}>{events.length || '0'} result</span>
                        <span className={styles.right} onClick={clearSearch}>clear search</span>
                      </div>
                      {
                        !activeDate ?
                        (
                          <p className={styles.bottom}>
                            Search for {getActiveChannelName()} Activities on {time.searchResultTime(activeDate).from}
                          </p>
                        ) :
                        (
                          <p className={styles.bottom}>
                            Search for {getActiveChannelName()} Activities from {time.searchResultTime(activeDate).from} to {time.searchResultTime(activeDate).to}
                          </p>
                        )
                      }
                      
                    </div>
                ) :
                <></>
              }
              {/* 列表 */}
              {
                events.length ?
                <ListUI 
                  events={events} 
                  hasMore={hasMore} 
                  loading={true} 
                  identify="list"
                  page={page}
                /> :
                <Nothing/>
              }
            </section>
          </section>
      );
    }  
  }

  public componentDidMount() {
    this.props.getEvents()
  }
}

const mapStateToProps = (state: any) => {
  return {
    success: state.getIn(['list', 'success']),
    events: state.getIn(['list','events']),
    hasMore: state.getIn(['list', 'hasMore']),
    searchState: state.getIn(['list', 'searchState']),
    channels: state.getIn(['list', 'channels']),
    activeChannel: state.getIn(['list', 'activeChannel']),
    dates: state.getIn(['list', 'dates']),
    activeDate: state.getIn(['list', 'activeDate']),
    haveSearch: state.getIn(['list', 'haveSearch']),
    page: state.getIn(['list', 'page'])
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEvents(events?: any){
      if(!events){
        dispatch(actionCreators.getEvents())
      }
    },
    getEventsBySearch(channel?:any, date?: any) {
      dispatch(actionCreators.getEventsBySearch(channel, date))
    },
    toggleSearch(value : any, channels: any) {
      if(value) {
        dispatch(actionCreators.getChannels())
      }
      dispatch(actionCreators.toggleSearch(value))
    },
    filterChannel(value: any) {
      dispatch(actionCreators.toggleSearch(value))
    },
    toggleChannel(id: any) {
      dispatch(actionCreators.toggleChannel(id))
    },
    toggleDate(dateName: any) {
      dispatch(actionCreators.toggleDate(dateName))
    },
    clearSearch() {
      dispatch(actionCreators.clearSearch())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

