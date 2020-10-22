import React, {useState} from 'react';
import './App.css';
import Landing from './component/Landing/Landing';
import { Route, Switch } from 'react-router-dom';
import Scrap from './component/Scrap/Scrap';
import {GlobalContext} from './services/context';
import Testing from './component/Processing/Processing';

function App() {
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
      <Route path="/processing">
        <Testing />
      </Route>
        {/* <Page/> */}
    </Switch>
    </GlobalContext.Provider>
  );
}

export default App;
