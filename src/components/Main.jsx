import addIcon from "../images/Vectorplus.svg";
import editIcon from "../images/Vectoredit.svg";

import Card from "./Card.jsx";

import { api } from "./App.js";

import { useState, useEffect } from "react";


export default function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api.getUserInfo().then((item) => {
      setUserName(item.name);
      setUserDescription(item.about);
      setUserAvatar(item.avatar);
    });
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <img
            src={userAvatar}
            alt="Foto de perfil"
            className="profile__image"
          />
          <div
            className="profile__edit-pic-button"
            onClick={props.onEditAvatarClick}
          ></div>
          <div className="profile__info">
            <div>
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__text">{userDescription}</p>
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
                onCardClick={props.onCardClick}
                onTrashClick={props.isTrashIconClick}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
