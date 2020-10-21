import React from 'react';
import styles from './Bar.module.css';
import {Link} from 'react-router-dom';
import SelectSearch from 'react-select-search';
import './styles.css';
import { useGlobal } from '../../services/context';
function Bar () {
    // const options = [
    //     {name: 'Swedish', value: 'sv'},
    //     {name: 'English', value: 'en'},
    //     {
    //         type: 'group',
    //         name: 'Group name',
    //         items: [
    //             {name: 'Spanish', value: 'es'},
    //         ]
    //     },
    // ];
    const {response, setUrl, setData, data, url} = useGlobal();
    const options = response.pages.map((page, i)=>{
        return {name: `${page.title}(${page.url}) `, value: i }
    });
    const onOptionChange =(e) =>{
        const {url, parent, title} = response.pages[e];
        setUrl(url);
        if(response.mapping[url])
            setData(response.mapping[url]);
        else setData({children:[], title, parent })
    }
    return (
        <div className={styles.bar}>
            <Link to="/" className={styles.title}>Home</Link>
            <span className={styles.website}> {response.url} </span>
            <div className={styles.searchBox}>
                <SelectSearch options={options} value={data.title} search={true} name="language" placeholder="Search Page" onChange={onOptionChange}/>
            </div>
        </div>
    )
}

export default Bar;