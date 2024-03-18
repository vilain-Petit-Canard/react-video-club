// npm install react-router-dom
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import React, { useState } from 'react';

import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import ListeFilms from '../ListeFilms/ListeFilms';
import Film from '../Film/Film';
import Admin from '../Admin/Admin';

import './App.css';

export const AppContext = React.createContext();


function App() {
  // const location = useLocation();

  const [logging, setLogging] = useState({estLog: false, usager: ''})

  function login(e) {
    e.preventDefault()
    if (e.target.usager.value == 'admin'){
      // sessionStorage.setItem('estLogin');
      setLogging(logging => ({ ...logging, estLog: true, usager: e.target.usager.value}) )
      e.target.reset();
    }
  }

  function logout() {
    setLogging(logging => ({ ...logging, estLog: false, usager: ""}) )
  }
  return (
    <AppContext.Provider value={logging}> 
    <Router>
      <Entete handleLogin={login} logging={logging} handleLogout={logout}/>
      <Routes>
        <Route path="/" element= {<Accueil/>} />
        <Route path="/accueil" element={<Accueil />}/>
        <Route path="/liste-films" element= {<ListeFilms/>} />
        <Route path="/film/:id" element= {<Film/>} />
        <Route path="/admin" element={logging.estLog ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </Router>
    </AppContext.Provider>

  );
}

export default App;
