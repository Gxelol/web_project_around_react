import addIcon from "../images/Vectorplus.svg";
import editIcon from "../images/Vectoredit.svg";

import Card from "./Card.jsx";

import { api } from './App.js';

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      props.setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id);
    props.setCards((state) => state.filter((c) => c._id !== card._id));
  }

  return (
    <>
      <main className="content">
        <section className="profile">
          <img
            src={currentUser.avatar}
            alt="Foto de perfil"
            className="profile__image"
          />
          <div
            className="profile__edit-pic-button"
            onClick={props.onEditAvatarClick}
          ></div>
          <div className="profile__info">
            <div>
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__text">{currentUser.about}</p>
            </div>

            <button
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            >
              <img src={editIcon} alt="Botão editar" />
            </button>
          </div>

          <button
            className="profile__add-button"
            onClick={props.isAddPlacePopupClick}
          >
            <img src={addIcon} alt="Botão adicionar" />
          </button>
        </section>

        <section className="elements">
          <h2 className="elements__title">Elements</h2>
          <ul className="elements__table elements__item">
            {props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardLike={handleCardLike}
                onCardClick={props.onCardClick}
                onCardDelete={handleDeleteCard}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
