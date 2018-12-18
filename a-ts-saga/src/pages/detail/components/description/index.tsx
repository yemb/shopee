import * as React from 'react'
import * as styles from './style.css'

const Description = (props: any) => {
    const {detail, viewAll, toggleViewAll} = props
    return (
        <section className={styles.wrapper}>
            <section className={styles.images}>
                    {
                        detail.get('images').map((img:any, index:any) =>{
                            return (
                                <span key={index}>
                                    <img 
                                        src={img} alt="images" />
                                </span>
                            )
                        })
                    }
            </section>
            <section className={!viewAll ? styles.textArea : styles.textAreaViewAll}>
                {detail.get('description')}
                {
                    !viewAll ?
                    <div className={styles.shape} />:
                    <></>
                }
                <span className={styles.viewAll} onClick={toggleViewAll}>{viewAll ? 'pick up' :'view all'}</span> :
                
            </section>
        </section>
    )
}

export default Description