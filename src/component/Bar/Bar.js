import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import styles from './Bar.module.css';
import './styles.css';
import { useGlobal } from '../../services/context';
import { ReactComponent as XMLICON } from '../../assets/icons/xml.svg';
import config from '../../services/config';

const fileDownload = require('js-file-download');

function Bar() {
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
  const [isLoading, setIsLoading] = useState(false);
  const { response, setUrl, setData } = useGlobal();
  const options = response.pages.map((page, i) => {
    return { name: `${page.title}(${page.url}) `, value: i };
  });
  const generateXML = e => {
    console.log('a');
    setIsLoading(true);
    fetch(`${config.apiUrl}/api/generatexml`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pages: response.pages }),
    })
      .then(resp => resp.json().then(data => ({ status: resp.status, body: data })))
      .then(res => {
        console.log(res);
        fileDownload(res.body, `${response.url}.xml`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onOptionChange = e => {
    const { url, parent, title } = response.pages[e];
    setUrl(url);
    if (response.mapping[url]) setData(response.mapping[url]);
    else setData({ children: [], title, parent });
  };
  return (
    <div className={styles.bar}>
      <Link to="/" className={styles.title}>
        Home
      </Link>
      <div className={styles.website_wrapper}>
        <span className={styles.website}> {response.url} </span>
        <div className={styles.xml_icon_wrapper}>
          <XMLICON className={styles.xml_icon} fill="#fff" onClick={generateXML} />
          <span className={styles.overlay}>{isLoading ? `Wait!` : `Download Sitemap!`}</span>
        </div>
        {/* <img src={xmlIcon} className={styles.xml_icon} alt="xmlPNG" onClick={generateXML} /> */}
      </div>
      <div className={styles.searchBox}>
        <SelectSearch
          options={options}
          search={true}
          name="language"
          placeholder="Search Page"
          onChange={onOptionChange}
        />
      </div>
    </div>
  );
}

export default Bar;
