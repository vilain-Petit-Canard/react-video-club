import './Commentaire.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App/App';

function Commentaire(props){
    const context = useContext(AppContext);

    let id = props.data.param;
    // console.log(props.data.commentaires);

    const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;

    const [listeCommentaire, setListeCommentaire] = useState([]);

    useEffect(() => {
        setListeCommentaire(props.data.commentaires);
    },[props.data.commentaires]);
    console.log(listeCommentaire);

    let tousLesCommentaires;
    if (listeCommentaire && listeCommentaire.length > 0) {
        tousLesCommentaires =
            listeCommentaire.map((commentaire, index) => (
                <div key={index} className='un-commentaire'>
                    <p>{commentaire.commentaire}</p>
                         <div className='comment-user-date'>
                            <span><strong>User: </strong>{commentaire.usager} </span> 
                            <span><strong>Date: </strong> 2011/02/14 </span> 
                        </div>
                </div>
                
            ));
    } else {
        tousLesCommentaires = <h3>Aucun commentaire</h3>;
    }

    // fonction pour soumettre un commentaire
    async function soumettreCommentaire(e){
        e.preventDefault()
        
        let commentaireContenu;
        let commentaireValue = document.querySelector("textarea").value;


        if (!listeCommentaire) {
            commentaireContenu = [{ commentaire: commentaireValue,  usager: context.usager}];
        } else {
            commentaireContenu = listeCommentaire;
            commentaireContenu.push({ commentaire: commentaireValue,  usager: context.usager });
        }
        
        const oOption = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentaires: commentaireContenu})
        }

        let putCommentaire = await fetch(urlFilm, oOption),
            getCommentaire = await fetch(urlFilm);

        Promise.all([putCommentaire, getCommentaire])
            .then(response => response[1].json())
            .then((data) => {
                    setListeCommentaire(data.commentaires)
        });
        
    };

    return(
        <div className='comment-div'>
            <h2 className='comment-title'>Les impressions</h2>
            <div class="comments-but-container">
                <div className='comments-container'>

                    <div className="input-comment">
                        <textarea className="comment-area" placeholder="Saisissez votre commentaire" rows="4" cols="50"></textarea> 
                    </div>
                
                
                        <h3 className='commentListe-title'>Liste des commentaires</h3>
                        {tousLesCommentaires}
                </div>
                <div>
                        <form onSubmit={soumettreCommentaire}>
                            <button type='submit'> Commenter </button>
                        </form>               
                </div>
            </div>
                
        </div>
    )
}

export default Commentaire;