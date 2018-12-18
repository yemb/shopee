import * as React from 'react';
import {RouteComponentProps} from 'react-router'
import { connect } from 'react-redux';

import { actionCreators } from './store';
import * as styles from './style.css'

import Card from './components/card/index'
import Tags from './components/tags/index'
import Description from './components/description'
import Footer from './components/footer/index'
import WhenWhere from './components/whenWhere/index'
import GoingLike from './components/goingLike/index'

import CommentUI from '@/common/commentUI'
import Header from '@/common/header'
import Nothing from '@/common/nothing'
import Toast from '@/common/toast'

// interface IRouterInfo {
//   id:any,
//   status: any
// }
export interface IProps extends RouteComponentProps <any>{
  success:any,
  status: any,
  getDetail: any,
  detail: any,
  goingList: any,
  likeList: any,
  getGoingList: any,
  getLikeList: any,
  getCommentList: any,
  buttonClick: any,
  oversize1:any,
  oversize2:any,
  toggleStatus:any,
  viewAll:any,
  toggleViewAll:any,
  clearCommentInput: any,
  commentInput: any,
  changeCommentInput: any,
  commentList: any,
  commentToast:any,
}

class Detail extends React.Component<IProps, any>{

    public render() {
      const {
        success,
        status,
        // getDetail,
        detail,
        goingList,
        likeList,
        buttonClick,
        oversize1,
        oversize2,
        toggleStatus,
        viewAll,
        toggleViewAll,
        clearCommentInput,
        commentInput,
        changeCommentInput,
        commentList,
        commentToast
      } = this.props

      if(!success) {
        return <></>
      } else {
        return (
          <section className={styles.detailWrapper}>

            {/* ********************  Header  ***********************/}                        
            <Header isHome={false}/>
            
            <section className={status==='details' ? styles.content : styles.contentFixed}>
              {/* ********************  card  ***********************/}            
              {
                status === "details" ? 
                (
                  <Card detail={detail}/>
                ):
                <></>
              }

              {/* ********************  tag  ***********************/}
              <Tags status={status} toggleStatus={toggleStatus}/>

              {/* ********************  description  ***********************/}
              {
                status === "details"? 
                <Description detail={detail} viewAll={viewAll} toggleViewAll={toggleViewAll}/> :
                <></>
              }

              {/* ********************  whenwhere  ***********************/}
              {
                status === "details" ?
                (<WhenWhere detail={detail}/>) :
                <></>
              }

              {/* ********************  GoingLike  ***********************/}
              {
                status === "comments" ?
                <></>:
                <GoingLike 
                  detail={detail} 
                  small={status==="details"} 
                  goingList={goingList} 
                  likeList={likeList}
                  oversize1={oversize1}
                  oversize2={oversize2}
                  buttonClick={buttonClick}
                />
              }
              {/* ********************  commentList  ***********************/}
              {
                !commentList.size && status === "comments"?
                <Nothing status="comments"/> :
                <CommentUI commentList={commentList} hasMore={false} loading={true}/>
              }

            </section>

            {/* ********************  footer  ***********************/}
            <Footer 
              status={status==='details'}
              detail={detail}
              toggleStatus={()=>toggleStatus('comments')}
              commentInput={commentInput}
              clearCommentInput={clearCommentInput}
              changeCommentInput={changeCommentInput}
            />
            {
              commentToast ?
              <Toast message="评论成功"/> :
              <></>
            }
          </section>
        );
      }
    }
    public componentDidMount() {
      console.log(this.props.status)
      this.props.getDetail(this.props.match.params.id, this.props.detail)
      this.props.getGoingList(this.props.match.params.id)
      this.props.getLikeList(this.props.match.params.id)
      this.props.getCommentList(this.props.match.params.id)

    }
    // public componentDidUpdate() {
    //   this.props.getCommentList(this.props.match.params.id)
    // }
}

const mapStateToProps = (state: any) => {
  return {
    success: state.getIn(['detail', 'success']),
    status: state.getIn(['detail', 'status']),
    detail: state.getIn(['detail', 'detail']),
    goingList: state.getIn(['detail', 'goingList']),
    likeList: state.getIn(['detail', 'likeList']),
    commentList: state.getIn(['detail', 'commentList']),
    oversize1: state.getIn(['detail', 'oversize1']),
    oversize2: state.getIn(['detail', 'oversize2']),
    viewAll: state.getIn(['detail', 'viewAll']),
    commentInput: state.getIn(['detail', 'commentInput']),
    commentToast: state.getIn(['detail', 'commentToast'])
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getDetail (id: any, detail ?: any) {
      // if(!detail) {
        // console.log('getdetail')
        dispatch(actionCreators.getDetail(id))
      // }
    },
    toggleStatus (value: any) {
      dispatch(actionCreators.toggleStatus(value))
    },
    getGoingList (id: any) {
      dispatch(actionCreators.getGoingList(id))
    },
    getLikeList (id: any) {
      dispatch(actionCreators.getLikeList(id))
    },
    buttonClick(id: number){
      console.log('buttonClick' + id)
      dispatch(actionCreators.buttonClick(id))
    },
    toggleViewAll() {
      dispatch(actionCreators.toggleViewAll())
    },
    clearCommentInput() {
      dispatch(actionCreators.clearCommentInput())
    },
    changeCommentInput(e:any) {
      dispatch(actionCreators.changeCommentInput(e.target.value))
    },
    getCommentList(id : any) {
      dispatch(actionCreators.getCommentList(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);
