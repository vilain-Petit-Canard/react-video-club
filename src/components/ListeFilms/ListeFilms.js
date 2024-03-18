import {useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TuileFilm from '../TuileFilm/TuileFilm';
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
  // const urlListeFilms = 'data/titre-asc.json';
  const [listeFilms, setListeFilms] = useState([]);
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);


  useEffect(()=>{
    // console.log('rendu');
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeFilms(data);
        // console.log(data);
      })

  }, [urlFiltre])



  // boucle dans la liste de film
const tuilesFilm = listeFilms.map((film, index)=> {
  return <Link to={`/film/${film.id}`} key={index} > <TuileFilm data={film} /> </Link>
})

  /**
   * 
   * @param {<*>} e 
   */
  function filtre(orderBy, orderDirection ){
    setUrlFiltre(`data/${orderBy}-${orderDirection}.json`);
  
    // seturlFiltre(`${urlListeFilms}?orderBy=realisation&orderDirection=asc`);

  }

  function maDeuxiemeFonction(){
    console.log('ma deuxieme fonction');
    // utiliser cette fonction pour rendre actif le filtre selectionné
  }

  return (
    <main className=''>
    {/* <button onClick={() => setEtat(!etat)}>Change etat</button> */}
    <div className='titre-filtres'>
      <h2 className='catalogueTitre'>{'Liste des films'.toUpperCase()}</h2>
      <ul className='filtres'>
        <li className='filtreItem' onClick={(e) => filtre('realisation', 'asc') } >Réalisation alphabétique (A-Z)</li>
        <li className='filtreItem' onClick={(e) => filtre('realisation', 'desc') } >Réalisation alphabétique (Z-A)</li>
        <li className='filtreItem' onClick={(e) => filtre('titre', 'asc') } >Titre alphabétique (Z-A)</li>
        <li className='filtreItem' onClick={(e) => filtre('titre', 'desc') } >Titre alphabétique (Z-A)</li>
        <li className='filtreItem' onClick={(e) => filtre('annee', 'asc') } >Année alphabétique (Z-A)</li>
        <li className='filtreItem' onClick={(e) => filtre('annee', 'desc') } >Année alphabétique (Z-A)</li>
      </ul>
    </div>
      <div className='filmListeContainer'>
          {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilms;
