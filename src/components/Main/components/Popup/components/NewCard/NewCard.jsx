import { useState } from "react";

export default function NewCard(props) {
  const { onAddCardSubmit } = props;

  const [data, setData] = useState({
    name: "",
    link: "",
  });

  function handleChange(evt) {
    const { name, value, validity, validationMessage } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
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
          className="popup__input popup__input_type_card-name"
          maxLength="30"
          minLength="1"
          name="name"
          placeholder="Título"
          required
          type="text"
          onChange={handleChange}
        />
        <span
          id="card-name-error"
          className="popup__error card-name-error"
        ></span>
      </label>
      <label className="popup__field">
        <input
          id="card-link"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="URL da imagem"
          type="url"
          required
          onChange={handleChange}
        />
        <span
          id="card-link-error"
          className="popup__error card-link-error"
        ></span>
      </label>
      <button type="submit" className="button popup__button">
        Salvar
      </button>
    </form>
  );
}
