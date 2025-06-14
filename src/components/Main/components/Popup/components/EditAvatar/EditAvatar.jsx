import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
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
          id="picture-link"
          className="popup__input popup__input_type_picture-link"
          name="picture-link"
          placeholder="URL da fotografia"
          type="url"
          required
          ref={avatarRef}
        />
        <span
          id="picture-link-error"
          className="popup__error picture-link-error"
        ></span>
      </label>
      <button type="submit" className="button popup__button">
        Salvar
      </button>
    </form>
  );
}
