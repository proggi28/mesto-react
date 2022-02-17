import React from "react";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
    return (
        <article className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
                <div className="popup__content">
                    <h2 className="popup__title">{title}</h2>
                    <form className="popup__form" name={name} onSubmit={onSubmit}>
                        {children}
                        <button type="submit" className="popup__save-button">{buttonText}</button>
                    </form>
                </div>

            </div>
        </article>
    )
}

export default PopupWithForm;