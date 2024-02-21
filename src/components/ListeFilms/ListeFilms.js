import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm/TuileFilms';
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
      console.log(data);
      setListeFilms(data);
    })

  }, [])
const tuilesFilm = listeFilms.map((film, index)=> {
  return <TuileFilm key={index} data={film} />
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
