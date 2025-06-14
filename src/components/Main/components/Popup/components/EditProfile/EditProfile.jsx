import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className="popup__input popup__input_type_profile-name"
          type="text"
          name="profile-name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span
          id="profile-name-error"
          className="popup__error profile-name-error"
        ></span>
      </label>
      <label className="popup__field">
        <input
          id="profession-name"
          className="popup__input popup__input_type_profession-name"
          type="text"
          name="profession-name"
          placeholder="Sobre Mim"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span
          id="profession-name-error"
          className="popup__error profession-name-error"
        ></span>
      </label>
      <button id="save-button" className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
