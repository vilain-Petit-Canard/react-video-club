import * as React from 'react';
import './Film.css';
import {useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Commentaire from '../commentaire/Commentaire';


function Film(props) {
  // Get the userId param from the URL.
  let { id } = useParams();
  let {test} = useParams();
  // console.log(id);
  const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;

  const [Film, setFilm] = useState([]);
  let [moyenneNote, setMoyenneNote] = useState();
  let [nombreNotes, setnombreNotes] = useState();
  let[noteValue, setNoteValue] = useState();

  useEffect(()=>{
    // console.log('rendu');
    fetch(urlFilm).then((reponse) => reponse.json()).then((data) => {
      // console.log(data);
      setFilm(data);
      // console.log(data.notes);
      if(data.notes && data.notes.length > 1){
        let lesNotes = data.notes;
        let sum = lesNotes.reduce((a,b)=> a+b, 0);
        let moyenne = sum/lesNotes.length;
        setMoyenneNote(moyenne.toFixed(2));
        setnombreNotes(lesNotes.length);
        setNoteValue(0);

      }
      // console.log(Film);
    })

  }, []);
  // function laNote
  // let noteValue = 0;
  
  function laNote(e){
    noteValue = parseInt(e.currentTarget.getAttribute('value'));
    const noteStar =document.querySelectorAll('.star');

    noteStar.forEach((star) => {
      const otherNotes = parseInt(star.getAttribute('value'));
      if(noteValue >= otherNotes){
        star.classList.add('star-checked');
      }else {
        star.classList.remove('star-checked');
      }
    })
  }
 
async function soumettreNote( ){
  // console.log(noteValue);
  if(noteValue > 0){
  let aNotes;
  if(!Film.notes) {
    aNotes = [noteValue];
  } else {
    aNotes = Film.notes;
    aNotes.push(noteValue);
    
  }
    // console.log(aNotes[aNotes.length-1]);

  // noteValue = parseInt(e.currentTarget.getAttribute('value'));

  let sum = aNotes.reduce((a,b)=> a+b, 0);
  let moyenne = sum/aNotes.length;
  setMoyenneNote(moyenne.toFixed(2));
  setnombreNotes(aNotes.length)
  setNoteValue(aNotes[aNotes.length-1]);
  
  console.log(noteValue);

    const oOptions = {
      method: 'Put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({notes: aNotes}) // rajoute note dans lobj dans database

    }

    let putNote = await fetch(urlFilm, oOptions),
        getFilm = await fetch(urlFilm);

    Promise.all([putNote, getFilm])
      .then(response => response[1].json())
      .then((data) => {
        // console.log(data);
        setFilm(data);
      })

    fetch(urlFilm, oOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.notes);
      })
      // Select the element with the id "paragraph"
    const paragraphElement = document.querySelector(".mesErreurSoumettre");

    // Check if the element exists
    if (paragraphElement) {
  // Remove the element from its parent node
  paragraphElement.parentNode.removeChild(paragraphElement);
}
  } else {
    const message = document.querySelector(".film-contenu");
    // Create a new paragraph element
    const paragraph = document.createElement('p');

    // Set the class of the paragraph element
    paragraph.classList.add('mesErreurSoumettre');

    // Set the text content of the paragraph element
    paragraph.textContent = 'Choisissez une note pour pouvoir la soumettre';

    // Append the paragraph element to the selected div
    message.appendChild(paragraph);
  }

  console.log(Film);
// 
    // let sum = aNotes.reduce((a, b) => a + b, 0);
    // let moyenneNotes = (sum / aNotes.length) || 0;
    //   console.log(Film.notes);
    // console.log(moyenneNotes.toFixed(2));
    // return moyenNombreVotes = [moyenneNotes.toFixed(2), aNotes.length];

}
// async function moyenneNote(){
// }

  return (
    <div>
      <main className='film-container'>
        <img className='poster-image' src={`/img/${Film.titreVignette}`} alt={Film.titre}/> 
        <div className='film-contenu'>
        <h1 className='film-titre'>{Film?.titre}</h1>
        <p className='film-realisation'> <strong>Réalisateur:</strong> {Film.realisation}</p>
        <p className='film-annee'> <strong>Année:</strong> {Film.annee}</p>
        <p className='film-description'> <strong>Description:</strong> {Film.description}</p>
        <div className='note-container'>
          <p className='film-note'> <strong>Moyenne des votes:</strong> {moyenneNote} /5 &nbsp;	 <strong> ({nombreNotes} votes) </strong></p>
          {/* <p className='film-nombre-note'> <strong>Nombre de votes:</strong> {nombreNotes}</p> */}
        </div>
        <div className='Note-stars'>

          <FontAwesomeIcon onClick={laNote} className='star' value={1} icon={faStar} />
          <FontAwesomeIcon onClick={laNote} className='star' value={2} icon={faStar} />
          <FontAwesomeIcon onClick={laNote} className='star' value={3} icon={faStar} />
          <FontAwesomeIcon onClick={laNote} className='star' value={4} icon={faStar} />
          <FontAwesomeIcon onClick={laNote} className='star' value={5} icon={faStar} />
        </div>
        <div className='btn-vote-div'>
        <button className="btn-vote" onClick={soumettreNote }>Voter</button>
        </div>
        
        </div>
      </main>
          <Commentaire data={{param: id, commentaires: Film.commentaires}}/>
    </div>
  )
  // ...

}

export default Film;