import React from 'react';

import Guest from './pages/Shared/Navbar/guest';
import Auth from './pages/Shared/Navbar/auth';
import AuthUser from './pages/Auth/AuthUser';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const navbar = () =>{
    const {getToken} = AuthUser();
    //const getToken = false;
    if(!getToken()){
      return <Guest />
    }
    return (
        <Auth />
    );
  };

  return (
    <div className="App">     
        {navbar()}
    </div>
  );
}

export default App;
