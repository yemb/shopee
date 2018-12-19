import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import * as commonActionCreator from '@/store/actionCreators'

import * as styles from './style.css'

const Header = (props: any) => {
    const { isHome, toggleSearch} = props
    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          {
            isHome ? 
            <i> <span className={styles.leftSearch} onClick={toggleSearch}/></i> :
            <i> <Link to="/list"><span className={styles.leftHome}/></Link></i>
          }
          <i>
            <span className={styles.mid} />
          </i> 
          
          <i>
            <Link to="/me"><span className={styles.right}/></Link>
          </i>
          
        </div>
      </React.Fragment>
    );
}

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     tolist() {
//       dispatch(commonActionCreator.tolist())
//     },
//     leaveList () {
//       dispatch(commonActionCreator.leavelist())
//     }
//   }
// }


export default connect(null, null)(Header);
