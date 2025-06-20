import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../Main/components/Popup/Popup";
import FormValidator from "../FormValidator/FormValidator";

export default function Register({ onLogin, popup, onClosePopup }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({
    email: true,
    password: true,
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin(data);
  };

  function handleCloseClick() {
    onClosePopup();
  }

  return (
    <>
      <form className="form" name="login-form" onSubmit={handleSubmit}>
        <h1 className="form__title">Entrar</h1>
        <div className="form__inputs">
          <input
            name="email"
            className={`form__input ${
              valids.email ? "" : "form__input_type_error"
            }`}
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
            required
            maxLength="50"
            minLength="5"
          />
          <FormValidator message={errors.email} isValid={valids.email} />
          <input
            name="password"
            className={`form__input ${
              valids.password ? "" : "form__input_type_error"
            }`}
            type="password"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
            required
            maxLength="20"
            minLength="2"
          />
          <FormValidator message={errors.password} isValid={valids.password} />
        </div>
        <button className="form__submit-button" type="submit">
          Inscrever-se
        </button>
        <Link to="/signup" className="form__link">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </form>

      {popup && (
        <Popup title="tooltip" onClose={handleCloseClick}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}
