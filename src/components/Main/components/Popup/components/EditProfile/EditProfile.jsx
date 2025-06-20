import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [data, setData] = useState({
    name: currentUser.name,
    about: currentUser.about,
  });

  const handleChange = (evt) => {
    const { name, value, validity, validationMessage } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser(data);
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
          name="name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          value={data.name}
          onChange={handleChange}
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
          name="about"
          placeholder="Sobre Mim"
          minLength="2"
          maxLength="200"
          value={data.about}
          onChange={handleChange}
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
