import React from "react";

function Card({card, onCardClick}) {

    const {name, link} = card;

    function handleClick() {
        onCardClick(card);
      }  

    return (
            <li className="card">
                <img src={link} alt={name} className="card__image" onClick={handleClick}/>
                <button type="button" className="card__button-delete"></button>
                <div className="description">
                    <h2 className="card__title">{name}</h2>
                    <div className="card__like-container">
                        <button type="button" className="card__heart"></button>
                        <p className="card__like-length">{card.likes.length}</p>
                    </div>
                </div>
            </li>
    )
}

export default Card;