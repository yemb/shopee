import * as React from 'react';
// import * as InfiniteScroll  from 'react-infinite-scroller';

import * as styles from './style.css'
import Item from './item'

import { connect } from 'react-redux';
import { actionCreators } from '@/pages/list/store';

class ListUI extends React.Component<any,any> {
    private myRef: React.RefObject<HTMLDivElement>;
    constructor(props: any) 
    {
        super(props)
        this.myRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this)
        this.state = {
            isend: false,
            loading: false
        }
    }
    public render() {
        const { 
            events, 
            hasMore, 
            identify,
        } = this.props
        console.log(events)
        const items: any = [];
        events.map((event: any) => {
            items.push(
                    <Item event={event} identify={identify} key={event.id||event.get('id')}/>
            );
        });
        return (
            <div 
                className={styles.Wrapper}
                ref={this.myRef}
            >
                {items}
                {
                    this.state.isend || !hasMore? 
                    <div className={styles.foot}>
                        已经到底了
                    </div> :
                    <div className={styles.foot}>
                        加载中
                    </div> 
                }
            </div>

        );
    }
    public handleScroll() {
        const scrollTop = this.myRef.current!.scrollTop
        const scrollHeight = this.myRef.current!.scrollHeight
        const clientHeight = this.myRef.current!.clientHeight
        const preLoadDis = 30
        console.log(this.myRef.current!.scrollHeight)
        console.log(this.myRef.current!.scrollTop)
        console.log(this.myRef.current!.clientHeight)

        if(this.state.isend) {
            return
        }
        if((scrollTop + clientHeight) >= (scrollHeight - preLoadDis) && this.state.loading === false){
            this.setState ({
                loading: true
            })
            // }
            setTimeout(()=>{
                this.props.getMoreEvent(this.props.page, this.props.activeChannel, this.props.activeDate)
                this.setState({
                    loading: false
                })
            },500)
        } 
    }
    public componentDidMount() {
        console.log(this.myRef.current)
        this.myRef.current!.addEventListener('scroll',this.handleScroll)
    }
};

const mapStateToProps = (state: any) => {
    return {
        activeChannel: state.getIn(['list', 'activeChannel']),
        activeDate: state.getIn(['list', 'activeDate']),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getMoreEvent(page: any,channel: any, date: any) {
            console.log('getMoreEvent')
            dispatch(actionCreators.getMoreEvent(page, channel,date))
        }
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(ListUI)