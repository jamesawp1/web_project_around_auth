import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ onLogin }) {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin(data);
  };

  return (
    <>
      <form className="form" name="login-form" onSubmit={handleSubmit}>
        <h1 className="form__title">Entrar</h1>
        <div className="form__inputs">
          <input
            name="email"
            className="form__input"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
            required
            maxLength="50"
            minLength="5"
          />
          <input
            name="password"
            className="form__input"
            type="password"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
            required
            maxLength="20"
            minLength="2"
          />
        </div>
        <button className="form__submit-button" type="submit">
          Inscrever-se
        </button>
        <Link to="/signup" className="form__link">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </form>
    </>
  );
}
