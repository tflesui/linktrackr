import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {
  getLinks
} from '../api';
// import { getAllLinks } from '../../db';

const App = () => {
  const [links, setLinks] = useState('');

  useEffect(() => {
    getLinks()
      .then(response => {
        console.log(response)
        setLinks(response.link_name);
      })
      .catch(error => {
        setLinks(error.message);
      });
  },[]);

  return (
    <div className="App">
      <NavBar />
      <div>{ links }</div>
    </div>
  );
}

export default App;