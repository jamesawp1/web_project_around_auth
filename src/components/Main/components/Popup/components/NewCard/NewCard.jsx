import { useState } from "react";
import FormValidator from "../../../../../FormValidator/FormValidator";

export default function NewCard(props) {
  const { onAddCardSubmit } = props;

  const [data, setData] = useState({
    name: "",
    link: "",
  });
  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({
    name: true,
    link: true,
  });

  function handleChange(evt) {
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
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddCardSubmit(data);
  }

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
          id="card-name"
          className={`popup__input ${
            valids.name ? "" : "popup__input_type_error"
          }`}
          maxLength="30"
          minLength="1"
          name="name"
          placeholder="Título"
          required
          type="text"
          onChange={handleChange}
        />
        <FormValidator message={errors.name} isValid={valids.name} />
      </label>
      <label className="popup__field">
        <input
          id="card-link"
          className={`popup__input ${
            valids.link ? "" : "popup__input_type_error"
          }`}
          name="link"
          placeholder="URL da imagem"
          type="url"
          required
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
