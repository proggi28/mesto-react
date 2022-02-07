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
                    onClose={closeAllPopups}>
                    <input id="name" className="popup__input popup__input_type_name" type="text" name="name"
                        placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="popup__input-error" id="name-error"></span>

                    <input id="description" className="popup__input popup__input_type_job" type="text" name="info"
                        required placeholder="Занятие" minLength="2" maxLength="200" />
                    <span className="popup__input-error" id="description-error"></span>

                    <button type="submit" className="popup__save-button popup__save-button_inactive">Сохранить</button>
                </PopupWithForm>
                <PopupWithForm
                    title="Новое место"
                    name="add-card"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
                    <input id="title" className="popup__input popup__input_type_title" type="text" name="title"
                        placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="popup__input-error" id="title-error"></span>

                    <input id="url" className="popup__input popup__input_type_place" type="url" name="url"
                        placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error" id="url-error"></span>
                    <button type="submit"
                        className="popup__save-button popup__save-button_add_card popup__save-button_inactive">Создать</button>
                </PopupWithForm>
                <PopupWithForm
                    title="Обновить аватар"
                    name="avatar"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}>
                    <input id="avatar" className="popup__input popup__input_avatar" type="url" name="avatar"
                        placeholder="Обновить аватар" required />
                    <span className="popup__input-error" id="avatar-error"></span>
                    <button className="popup__save-button popup__save-button_button-avatar">Сохранить</button>
                </PopupWithForm>
                <PopupWithForm
                    title="Вы уверены?"
                    name="delete">
                    <button className="popup__save-button popup__save-button_button-delete">Да</button>
                </PopupWithForm>
                <ImagePopup isOpen={!!selectedCard.name && !!selectedCard.link} card={selectedCard} onClose={closeAllPopups} />
            </div>
        </div>
    );
}

export default App;
