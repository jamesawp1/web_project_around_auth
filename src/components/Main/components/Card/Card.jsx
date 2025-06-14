import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import deleteIcon from "../../../../images/delete-icon.png";
import likeIcon from "../../../../images/button__icon.svg";
import likeIconActive from "../../../../images/button__icon_active.svg";
import PopupConfirmation from "../Popup/components/PopupConfirmation/PopupConfirmation";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const handleOpenPopup = props.openImg;
  const { onCardLike } = props;
  const { onCardDelete } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };
  const cardLikeButtonSrc = !isLiked ? likeIcon : likeIconActive;
  const confirmationPopup = {
    title: "Tem certeza?",
    children: <PopupConfirmation card={props.card} onDelete={onCardDelete} />,
  };

  function handleLikeClick() {
    onCardLike(props.card);
  }

  return (
    <li className="gallery__card">
      <button className="gallery__delete-button">
        <img
          className="gallery__delete-icon"
          src={deleteIcon}
          alt="Ícone do botão que exclui uma imagem da galeria, representando uma lixeira"
          onClick={() => handleOpenPopup(confirmationPopup)}
        />
      </button>
      <img
        className="gallery__card-image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <div className="gallery__wrapper-text-and-like-button">
        <h2 className="gallery__card-name">{name}</h2>
        <button className="gallery__like-button">
          <img
            className="gallery__like-icon"
            src={cardLikeButtonSrc}
            alt="Ícone do botão de curtir, em formato de coração"
            onClick={handleLikeClick}
          />
        </button>
      </div>
    </li>
  );
}
