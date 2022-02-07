/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserServerInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })

    })

    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data.map((item) => ({
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    id: item._id
                })))
            })
            .catch((err) => {
                console.log(err);
            })
    })



    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__image-button" onClick={onEditAvatar}>
                        <img
                            src={userAvatar}
                            alt="Аватарка" className="profile__avatar"
                            style={{ backgroundImage: `url(${userAvatar})` }} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__wrapper">
                            <h1 className="profile__title">{userName}</h1>
                            <p className="profile__text">{userDescription}</p>
                        </div>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    </div>
                    <button
                        type="button"
                        className="profile__add-button"
                        aria-label="Кнопка редактирования"
                        onClick={onAddPlace}>
                    </button>
                </section>
                <section className="cards">
                    <ul className="cards__list-style">
                    </ul>
                </section>
            </main>

            <section className="cards">

                <ul className="cards__list-style">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} onCardClick={onCardClick} />
                    ))}

                </ul>

            </section>
        </>
    )
}

export default Main;