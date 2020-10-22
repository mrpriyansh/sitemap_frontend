import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './Landing.module.css';

function Landing() {
  const [inputUrl, changeInputUrl] = useState('https://mika.house/');
  const [npages, setNpages] = useState();
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    // history.push(`/processing/?url=asdf`)
    history.push(`/processing/?url=${inputUrl}&npages=${npages}`);
    // fetch(`${config.apiUrl}/api/scrap`, {
    //     method:'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({url:inputUrl}),
    // })
    // .then(response => response.json().then(data => ({ status: response.status, body: data })))
    // .then(res=>{
    //     setResponse(res.body);
    //     setData(res.body.mapping[res.body.url]);
    //     setUrl(res.body.url);
    //    history.push({
    //     pathname: '/processing/'
    //    })
    //     // if(res.status===200){

    //     // }
    // })
  };
  const onChangeURl = e => {
    changeInputUrl(e.target.value);
  };
  const onChangePageCount = e => {
    setNpages(e.target.value);
  };
  return (
    <div className={styles.landing}>
      <div className={styles.text_wrapper}>
        <p className={styles.text_1}>This website helps you to generate</p>
        <p className={styles.text_2}>user-friendly sitemaps of websties you love.</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <input
            type="url"
            className={styles.input_field}
            required
            placeholder="Enter domain url"
            value={inputUrl}
            onChange={onChangeURl}
          />
          <input
            type="number"
            min="1"
            max="500"
            className={styles.input_number}
            required
            placeholder="Max pages"
            value={npages}
            onChange={onChangePageCount}
          />
        </div>
        <button type="submit" className={styles.generate}>
          {' '}
          Generate
        </button>
      </form>
    </div>
  );
}

export default Landing;
