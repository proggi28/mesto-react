import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';

function App() {

    const [selectedCard, setSelectedCard] = React.useState({});

    function handleCardClick(card) {
        setSelectedCard({...card});
    }

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

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
        <div className="pageContent">
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}>
                </Main>
                <Footer />
                <PopupWithForm
                    title="Редактировать профиль"
                    name="profile"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    buttonText='Сохранить'>
                    <input id="name" className="popup__input popup__input_type_name" type="text" name="name"
                        placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="popup__input-error" id="name-error"></span>

                    <input id="description" className="popup__input popup__input_type_job" type="text" name="info"
                        required placeholder="Занятие" minLength="2" maxLength="200" />
                    <span className="popup__input-error" id="description-error"></span>
                </PopupWithForm>
                <PopupWithForm
                    title="Новое место"
                    name="add-card"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    buttonText='Создать'>
                    <input id="title" className="popup__input popup__input_type_title" type="text" name="title"
                        placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="popup__input-error" id="title-error"></span>

                    <input id="url" className="popup__input popup__input_type_place" type="url" name="url"
                        placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error" id="url-error"></span>
                </PopupWithForm>
                <PopupWithForm
                    title="Обновить аватар"
                    name="avatar"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    buttonText='Сохранить'>
                    <input id="avatar" className="popup__input popup__input_avatar" type="url" name="avatar"
                        placeholder="Обновить аватар" required />
                    <span className="popup__input-error" id="avatar-error"></span>
                </PopupWithForm>
                <PopupWithForm
                    title="Вы уверены?"
                    name="delete"
                    buttonText='Да'>
                </PopupWithForm>
                <ImagePopup isOpen={!!selectedCard.name && !!selectedCard.link} card={selectedCard} onClose={closeAllPopups} />
            </div>
        </div>
    );
}

export default App;
