import * as React from 'react';

import { connect } from 'react-redux';

import * as styles from './style.css'


const Btn = (props: any) => {
    return (
        <button 
            className={props.active ? styles.active : styles.notActive}
        >
            {props.value || 'channel'}
        </button>
    )
}
export default connect(null, null)(Btn)