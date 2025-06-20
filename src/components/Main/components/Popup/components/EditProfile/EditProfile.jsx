import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
import FormValidator from "../../../../../FormValidator/FormValidator.jsx";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [data, setData] = useState({
    name: currentUser.name,
    about: currentUser.about,
  });
  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({
    name: true,
    about: true,
  });

  const handleChange = (evt) => {
    const { name, value, validity, validationMessage } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? "" : validationMessage,
    }));

    setValids((prev) => ({
      ...prev,
      [name]: validity.valid,
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
          className={`popup__input ${
            valids.name ? "" : "popup__input_type_error"
          }`}
          type="text"
          name="name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          value={data.name}
          onChange={handleChange}
          required
        />
        <FormValidator message={errors.name} isValid={valids.name} />
      </label>
      <label className="popup__field">
        <input
          id="profession-name"
          className={`popup__input ${
            valids.about ? "" : "popup__input_type_error"
          }`}
          type="text"
          name="about"
          placeholder="Sobre Mim"
          minLength="2"
          maxLength="200"
          value={data.about}
          onChange={handleChange}
          required
        />
        <FormValidator message={errors.about} isValid={valids.about} />
      </label>
      <button id="save-button" className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
