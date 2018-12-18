import * as React from 'react';
import * as InfiniteScroll  from 'react-infinite-scroller';

import * as styles from './style.css'
import Item from './item'

const ListUI = (props:any) => {

        const { events, hasMore, identify } = props
        const loader = <div className={styles.loader}>Loading ...</div>;

        const items: any = [];
        events.map((event: any) => {
            items.push(
                <div key={event.id||event.get('id')}>
                    <Item event={event} identify={identify}/>
                </div>
            );
        });

        console.log('events in list', events)

        const loadItems = () => {
            console.log('loadITems')
        }
        // const scrollAction = () => {
        //     console.log('scrollAction')
        // }
        return (
            <div className={styles.listWrapper}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadItems}
                    hasMore={hasMore}
                    loader={loader}
                >
                        {items}
                        {
                            hasMore? 
                            <p>加载更多</p> :
                            <p>没有更多了</p>
                        }
                </InfiniteScroll>
            </div>

        );
    // }
};

export default ListUI