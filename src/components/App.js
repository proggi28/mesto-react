import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getUserServerInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data.map((item) => ({
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    _id: item._id,
                    owner: item.owner,
                })))
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function handleCardClick(card) {
        setSelectedCard({ ...card });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.addLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(name, about) {
        api.editProfile(name, about)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(name, link) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="pageContent">
                <div className="page">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}>
                    </Main>
                    <Footer />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                    <PopupWithForm
                        title="Вы уверены?"
                        name="delete"
                        buttonText='Да'>
                    </PopupWithForm>
                    <ImagePopup isOpen={selectedCard.name && selectedCard.link} card={selectedCard} onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
