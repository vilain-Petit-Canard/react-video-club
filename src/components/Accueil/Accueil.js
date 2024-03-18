import './Accueil.css';
import { NavLink } from 'react-router-dom';
import bgImage from './bg-image.jpg';


function Accueil() {
  return (
    <div className="accueil">
        <img className="bg-image" src={bgImage} alt='background image'/>
        <div className='text-content'>
           <h1 className="accueil-bienvenue" >BIENVENUE AU SUPER VIDEOCLUB</h1>
          <NavLink to="/liste-films"><h2 className="accueil-titre">VISIONNER UN FILM</h2></NavLink>
        </div>
       
    </div>
  );
}

export default Accueil;
