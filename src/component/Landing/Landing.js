import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import config from '../../services/config';
import { useGlobal } from '../../services/context';
import styles from './Landing.module.css';

function Landing() {
    const [inputUrl, changeInputUrl] = useState('');
    const history = useHistory();
    const {setData, setUrl, setResponse} = useGlobal();
    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${config.apiUrl}/api/scrap`, {
            method:'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url:inputUrl}),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res=>{
            setResponse(res.body);
            setData(res.body.mapping[res.body.url]);
            setUrl(res.body.url);
           history.push({
            pathname: '/sitemap'
           })
            // if(res.status===200){
                
            // }
        })
    }
    const onChangeURl = e => {
        changeInputUrl(e.target.value);
    }
    return (
        <div className={styles.landing}>
            <div className={styles.text_wrapper}>
                <p className={styles.text_1}>
                    This website helps you to generate 
                </p>
                <p className={styles.text_2}>
                    user-friendly sitemaps of websties you love.
                </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="url" className={styles.input_field} required placeholder="Enter domain url" value={inputUrl} onChange={onChangeURl}/>
                <button type="submit" className={styles.generate} > Generate</button>
            </form>
        </div>
    )
}

export default Landing;