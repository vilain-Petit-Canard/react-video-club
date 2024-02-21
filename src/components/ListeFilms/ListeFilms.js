import {useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TuileFilm from '../TuileFilms/TuileFilms';
import './ListeFilms.css';

function ListeFilms() {
  // const [etat, setEtat] = useState(true);
  // const listeFilms =[
  //   {titre: 'Film 1', realisateur: 'Billy', annee: '2015'},
  //   {titre: 'Film 2', realisateur: 'Bly', annee: '2045'},
  //   {titre: 'Film 3', realisateur: 'Bil', annee: '2115'},
  //   {titre: 'Film 4', realisateur: 'BOB', annee: '2155'}
  // ]

  const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const [listeFilms, setListeFilms] = useState([]);

  useEffect(()=>{
    console.log('rendu');
    fetch(urlListeFilms).then((reponse) => reponse.json()).then((data) => {
      setListeFilms(data);
      console.log(data);
    })

  }, [])
  // boucle dans la liste de film
const tuilesFilm = listeFilms.map((film, index)=> {
  return <Link to={`/film/${film.id}`} key={index} > <TuileFilm data={film} /> </Link>
})


  return (
    <main>
    {/* <button onClick={() => setEtat(!etat)}>Change etat</button> */}
      <h2>Liste des films</h2>
      <div>
          {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilms;
