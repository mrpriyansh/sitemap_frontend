import React, { useState } from 'react';
import Page from '../Page/Page';
import styles from './Scrap.module.css';
import {Redirect, useHistory } from 'react-router-dom'
import Hierarchy from '../Hierarchy/Hierarchy';
import { useGlobal } from '../../services/context';
import Bar from '../Bar/Bar';

function Scrap (props) {
    const {data, url, response } = useGlobal();
    const history = useHistory();
    if(!response ) return <Redirect  to="/" />
    if(!response?.mapping[url]) {
        alert('Please check the URL or contact adminstrator!');
        history.push('/');
    }
    return (
        <div className={styles.scrap}>
            <Bar />
            {/* <div className={styles.info}>
                <span> Domain :</span>
                <span> abviiitmalumniportal.gaharana.live</span>
            </div> */}
            <Hierarchy parent={data} url={url}/>
        </div>
    )
}

export default Scrap;