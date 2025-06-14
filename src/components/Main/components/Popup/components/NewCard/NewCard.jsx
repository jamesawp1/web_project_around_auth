import { useState } from "react";

export default function NewCard(props) {
  const { onAddCardSubmit } = props;
  const [name, setName] = useState([]);
  const [link, setLink] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddCardSubmit({ name, link });
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
          name="card-name"
          placeholder="Título"
          required
          type="text"
          onChange={handleNameChange}
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
          name="card-link"
          placeholder="URL da imagem"
          type="url"
          required
          onChange={handleLinkChange}
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
