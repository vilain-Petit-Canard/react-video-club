import './TuileFilms.css';
// import {NavLink} from 'react-router-dom';

function TuileFilms(props) {
  return (
    <article>
        <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        <h2>{props.data.titre}</h2>
        <p>{props.data.realisateur}</p>
        <p>{props.data.annee}</p>
    </article>
  );
}

export default TuileFilms;
