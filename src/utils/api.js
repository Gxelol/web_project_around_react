export default class Api {
  constructor(url, authorization) {
    this._url = url;
    this._authorization = authorization;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getServerCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  _loadingData(formElement, isLoading) {
    const formButton = formElement.querySelector('.popup__submit');

    if (formElement.classList.contains('popup__form_local')) {
      if (isLoading) {
        formButton.textContent = "Criando..."
      }
      else {
        formElement.classList.remove("popup_active");
        document.querySelector(".container__semitransparent").style.visibility = "hidden";
        document.querySelector(".container__semitransparent").style.opacity = "0";
      }
    }else {
      if (isLoading) {
        formButton.textContent = "Salvando..."
      }
      else {
        formElement.classList.remove("popup_active");
        document.querySelector(".container__semitransparent").style.visibility = "hidden";
        document.querySelector(".container__semitransparent").style.opacity = "0";
      }
    }
  }

  editProfile(name, about) {
    const form = document.querySelector('.popup__form_edit-profile');
    this._loadingData(form, true);

    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._loadingData(form, false);
      })
  }

  addNewCard(cardName, cardLink) {
    const form = document.querySelector('.popup__form_local');
    this._loadingData(form, true);

    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._loadingData(form, false);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  editProfilePicture(avatarLink) {
    const form = document.querySelector('.edit-profile__form');
    this._loadingData(form, true);

    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._loadingData(form, false);
      })
  }
}