import * as React from 'react';
import {useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function Film(props) {
  // Get the userId param from the URL.
  let { id } = useParams();
  // console.log(id);
  const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;

  const [Film, setFilm] = useState([]);

  useEffect(()=>{
    // console.log('rendu');
    fetch(urlFilm).then((reponse) => reponse.json()).then((data) => {
      // console.log(data);
      setFilm(data);
      console.log(Film);
    })

  }, [])
  // ...

}

export default Film;