import './TuileFilm.css';
// import {NavLink} from 'react-router-dom';

function TuileFilm(props) {
  return (
    <article className='poster'>
        <img className='poster-image' src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        {/* <h2 className='poster-title'>{props.data.titre}</h2> */}
        {/* <p>{props.data.realisation}</p> */}
        {/* <p>{props.data.annee}</p> */}
    </article>
  );
}

export default TuileFilm;
