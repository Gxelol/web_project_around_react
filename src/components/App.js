import { useState, useEffect } from "react";

import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Api from "../utils/api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import AddPlacePopup from './AddPlacePopup.js';

export const api = new Api(
  "https://around.nomoreparties.co/v1/web_ptbr_05",
  "2435b682-2492-4802-b266-a6d24ed22bde"
);

export default function App(props) {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
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

  function handleAddPlaceSubmit(cardName, cardLink) {
    api.addNewCard(cardName, cardLink).then((newCard) => {
      setCards([newCard, ...cards]);
    })
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    document.querySelector(".container__semitransparent").style.visibility =
      "hidden";
    document.querySelector(".container__semitransparent").style.opacity = "0";
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
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
            currentUser={currentUser}
            cards={cards}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            isAddPlacePopupClick={handleAddPlaceClick}
            handleCardLike={handleCardLike}
            handleDeleteCard={handleDeleteCard}
            onCardClick={handleCardClick}
          />

          <Footer />
        </div>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />       

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />       

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
