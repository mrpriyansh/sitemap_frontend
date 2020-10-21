import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Page from './component/Page/Page';
import Landing from './component/Landing/Landing';
import { Route, Switch } from 'react-router-dom';
import Scrap from './component/Scrap/Scrap';
import {GlobalContext} from './services/context';
import { useLocation } from 'react-router';

function App() {
  const location =  useLocation();
  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState();
  // const [data, setData] = useState(location.state.detail.mapping[location.state.detail.url]);
  // const [url, setUrl] = useState(location.state.detail.url);
  return (
    <GlobalContext.Provider  value={{ data, setData, url, setUrl, response, setResponse }}>

    <Switch>
      <Route exact path="/sitemap" >
        <Scrap />
      </Route>
      <Route exact path="/">
        <Landing/>
      </Route>
        {/* <Page/> */}
    </Switch>
    </GlobalContext.Provider>
  );
}

export default App;
