// npm install react-router-dom
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import ListeFilms from '../ListeFilms/ListeFilms';
import './App.css';

function App() {
  return (
    <Router>

      <Entete/>
      <Routes>
        <Route path="/" element= {<Accueil/>} />
        <Route path="/Liste-films" element= {<ListeFilms/>} />
      </Routes>
    </Router>
  );
}

export default App;
