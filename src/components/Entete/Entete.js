import { NavLink } from 'react-router-dom';
import './Entete.css';

function Entete() {
  return (
   <header>
    <NavLink to="/"><h1>VideoCLub</h1></NavLink>
    <nav>
      <NavLink to="/liste-films"><h1>Liste des films</h1></NavLink>
    </nav>
   </header>
  );
}

export default Entete;
