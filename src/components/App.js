import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Api from "../utils/api.js";

export const api = new Api(
  "https://around.nomoreparties.co/v1/web_ptbr_05",
  "2435b682-2492-4802-b266-a6d24ed22bde"
);

export default function App(props) {
  const [cardsData, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    document.querySelector(".container__semitransparent").style.visibility =
      "visible";
    document.querySelector(".container__semitransparent").style.opacity = "1";
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    document.querySelector(".container__semitransparent").style.visibility =
      "visible";
    document.querySelector(".container__semitransparent").style.opacity = "1";
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    document.querySelector(".container__semitransparent").style.visibility =
      "visible";
    document.querySelector(".container__semitransparent").style.opacity = "1";
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
    document.querySelector(".container__semitransparent").style.visibility =
      "visible";
    document.querySelector(".container__semitransparent").style.opacity = "1";
  }

  function handleTrashIconClick(card) {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    document.querySelector(".container__semitransparent").style.visibility =
      "visible";
    document.querySelector(".container__semitransparent").style.opacity = "1";
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    document.querySelector(".container__semitransparent").style.visibility =
      "hidden";
    document.querySelector(".container__semitransparent").style.opacity = "0";
  }

  useEffect(() => {
    api.getServerCards().then((card) => {
      setCards(card);
    });
  }, []);

  return (
    <div className="container">
      <div className="container__semitransparent"></div>

      <div className="page">
        <Header />

        <Main
          cards={cardsData}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          isAddPlacePopupClick={handleAddPlaceClick}
          isTrashIconClick={handleTrashIconClick}
          onCardClick={handleCardClick}
        />

        <Footer />
      </div>

      <PopupWithForm
        title="Editar perfil"
        buttonText="Salvar"
        name=""
        buttonClass="popup__save-button"
        formName="profile__form"
        formClass="popup__form_edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="nameP"
          placeholder="Nome"
          className="popup__input popup__input-name"
          required
          id="name-input"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__placeholder name-input-error"></span>

        <input
          type="text"
          name="about"
          placeholder="Sobre mim"
          className="popup__input popup__input-about"
          id="about-input"
          required
          minLength="2"
          maxLength="200"
        />

        <span className="popup__placeholder about-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Novo Local"
        name="location"
        buttonText="Criar"
        buttonClass="location__create-button"
        formName="form_local"
        formClass="popup__form_local"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          placeholder="Título"
          className="popup__input popup__input-name location__input-title"
          id="title-input"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__placeholder title-input-error"></span>
        <input
          type="url"
          name="link"
          placeholder="Link de imagem"
          className="popup__input location__input-url"
          id="url-input"
          required
        />
        <span className="location__placeholder url-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Alterar a foto de perfil"
        buttonText="Salvar"
        buttonClass="edit-profile__button"
        name="edit-profile"
        formName="form_edit-profile"
        formClass="edit-profile__form"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="linkProfilePic"
          placeholder="Link"
          className="popup__input edit-profile__input-url"
          id="edit-profile-input"
          required
        />
        <span className="edit-profile-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
          title="Tem certeza?"
          buttonText="Sim"
          buttonClass="confirmation__button"
          name="confirmation"
          formClass="confirmation__form"
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
        />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}
