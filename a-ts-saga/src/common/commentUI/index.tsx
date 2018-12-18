import * as React from 'react';
import * as InfiniteScroll  from 'react-infinite-scroller';

import * as styles from './style.css'
import Item from './item'

const CommentUI  =(props: any) => {

  const { commentList, hasMore, loading } = props
//   const loader = <div className={styles.loader}>Loading ...</div>;

  const items: any = [];
  commentList.map((comment: any) => {
      items.push(
          <div key={comment.get('id')}>
              <Item comment={comment}/>
          </div>
      );
  });

  const loadItems = () => {
    console.log('loadITems')
  } 

  return (
    <section className={styles.wrapper}>
      <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={!loading && hasMore}
        //   loader={loader}
      >
              {items}
      </InfiniteScroll>
    </section>
  );
}

export default CommentUI;
