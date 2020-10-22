import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Processing.module.css';
import config from '../../services/config';
import { useGlobal } from '../../services/context';
import { ReactComponent as Loader } from '../../assets/icons/scan.svg';

function Testing() {
  let socket;
  const [qSize, setqSize] = useState(0);
  const { setData, setUrl, setResponse } = useGlobal();
  const { url, npages } = queryString.parse(window.location.search);
  const history = useHistory();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    socket = io(config.apiUrl);
    // socket.emit('join', ()=>{
    //     console.log('joined');

    // })
    socket.emit('sendMessage', url, npages, () => {
      console.log('sent');
    });
    socket.on('recieved', res => {
      setResponse(res);
      setData(res?.mapping[res.url]);
      setUrl(res?.url);
      history.push('/sitemap');
    });
    // eslint-disable-next-line consistent-return
    socket.on('update', queueSize => {
      if (queueSize === -777) {
        alert('Error occured in server. Please try again later');
        return history.push('/');
      }
      setqSize(queueSize);
    });
    return () => {
      socket.close();
    };
  }, []);
  // const handleClick = () => {
  //     const url = 'https://mika.house/';

  //     socket.emit('sendMessage', url, () => {
  //         console.log('sent');
  //     });
  // }
  return (
    <div className={styles.processing}>
      <div className={styles.bar}>
        <Link to="/" className={styles.title}>
          Home
        </Link>
        <span className={styles.website}> {url} </span>
        <div className={styles.dummy}></div>
      </div>
      <div className={styles.process}>
        <Loader />
        <div className={styles.stats}>
          <div>
            {' '}
            Pages in Queue <p>{qSize}</p>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testing;
