import trashIcon from '../images/Trashclose.svg';
import emptyHeartIcon from '../images/VectorheartEmpty.svg';

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div id="card__div">
      <li className="element" id="">
        <img
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
          className="element__image"
        />
        <button className="element__delete" onClick={props.onTrashClick}>
          <img src={trashIcon} alt="Botão lixeira" />
        </button>
        <div className="element__description">
          <p className="element__title">{props.card.name}</p>
          <div className="element__button-container">
            <button className="element__like">
              <img src={emptyHeartIcon} alt="Botão curtir" />
            </button>
            <p className="element__counter">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}
