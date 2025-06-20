import { useRef, useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
import FormValidator from "../../../../../FormValidator/FormValidator.jsx";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({
    link: true,
  });

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  const handleChange = (evt) => {
    const { name, validity, validationMessage } = evt.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? "" : validationMessage,
    }));

    setValids((prev) => ({
      ...prev,
      [name]: validity.valid,
    }));
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
          id="picture-link"
          className={`popup__input ${
            valids.link ? "" : "popup__input_type_error"
          }`}
          name="link"
          placeholder="URL da fotografia"
          type="url"
          required
          ref={avatarRef}
          onChange={handleChange}
        />
        <FormValidator message={errors.link} isValid={valids.link} />
      </label>
      <button type="submit" className="button popup__button">
        Salvar
      </button>
    </form>
  );
}
