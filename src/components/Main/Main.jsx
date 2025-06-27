import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card.jsx";
import editImg from "../../images/icon__change-picture-profile.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const {
    popup,
    onOpenPopup,
    onClosePopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlaceSubmit,
  } = props;
  function handleOpenClick(popup) {
    onOpenPopup(popup);
  }
  function handleCloseClick() {
    onClosePopup();
  }

  const newCardPopup = {
    title: "New Card",
    children: <NewCard onAddCardSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit Avatar", children: <EditAvatar /> };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Imagem de um senhor de idade."
            onClick={() => handleOpenClick(editAvatarPopup)}
          />
          <img
            className="profile__edit-picture"
            src={editImg}
            alt="Imagem representando uma caneta"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 id="profile-name" className="profile__title">
              {currentUser.name}
            </h1>
            <h2 id="profile-role" className="profile__subtitle">
              {currentUser.about}
            </h2>
          </div>
          <button
            className="profile__edit-button"
            onClick={() => handleOpenClick(editProfilePopup)}
          ></button>
        </div>
        <button
          className="profile__add-button"
          onClick={() => handleOpenClick(newCardPopup)}
        ></button>
      </section>

      <ul className="gallery">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              openImg={handleOpenClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </ul>
      {popup && (
        <Popup onClose={handleCloseClick} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
