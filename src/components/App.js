import { useState, useEffect } from "react";

import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Api from "../utils/api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

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
  const [currentUser, setUser] = useState({});
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

  function handleUpdateUser(name, about) {
    api.editProfile(name, about).then((data) => {
      setUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatarLink) {
    api.editProfilePicture(avatarLink).then((data) => {
      console.log(data);
      setUser({ ...currentUser, avatar: data.avatar });
      closeAllPopups();
    });
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

    api.getUserInfo().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="container__semitransparent"></div>

        <div className="page">
          <Header />

          <Main
            user={currentUser}
            cards={cardsData}
            setCards={setCards}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            isAddPlacePopupClick={handleAddPlaceClick}
            isTrashIconClick={handleTrashIconClick}
            onCardClick={handleCardClick}
          />

          <Footer />
        </div>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        /> 

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

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 

        {/* <PopupWithForm
          title="Tem certeza?"
          buttonText="Sim"
          buttonClass="confirmation__button"
          name="confirmation"
          formClass="confirmation__form"
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
        /> */}

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
