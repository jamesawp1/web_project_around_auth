import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../Main/components/Popup/Popup";

export default function Register({ onRegister, popup, onClosePopup }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCloseClick() {
    onClosePopup();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(data);
  };

  return (
    <>
      <form name="register-form" className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Inscrever-se</h1>
        <div className="form__inputs">
          <input
            name="email"
            className="form__input"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="form__input"
            type="password"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button className="form__submit-button" type="submit">
          Inscrever-se
        </button>
        <Link to="/signin" className="form__link">
          Já é um membro? Faça o login aqui!
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
