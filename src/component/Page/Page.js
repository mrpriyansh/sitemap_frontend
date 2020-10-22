import React from 'react';
import styles from './Page.module.css';
import { ReactComponent as CancelSVG} from '../../assets/icons/cancel.svg';
import { useGlobal } from '../../services/context';

function Page({title, url, parent, isParent}) {
    const { setData, setUrl, response} = useGlobal();
    const showChildren = () =>{
        setUrl(url);
        setData(response.mapping[url]);
    }
    const goUpward = () =>{
        setUrl(parent);
        setData(response.mapping[parent]);
    }
    return (
        <div className={styles.webpage}> 
            <div className={styles.tab}>
                <p className={styles.title} >{title} </p>
                <span> {title} </span>
                <CancelSVG className={styles.cancelsvg}/>
            </div>
            <div className={styles.content}>
                {parent?.length? <button onClick={goUpward}> Go Upward</button>: (!isParent && response.mapping[url]?.children?.length) ? <button onClick={showChildren}> Show Children</button> :  null }
                <a href={url} target="_blank" rel="noopener noreferrer" ><button > Visit </button> </a>
            </div>
        </div>
    )
}

export default Page;