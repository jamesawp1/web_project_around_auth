export default function Register() {
  return (
    <>
      <form name="register-form" className="form" noValidate>
        <h1 className="form__title">Inscrever-se</h1>
        <div className="form__inputs">
          <input
            name="email"
            className="form__input"
            type="email"
            placeholder="E-mail"
          />
          <input
            name="password"
            className="form__input"
            type="password"
            placeholder="Senha"
          />
        </div>
        <button className="form__submit-button" type="submit">
          Inscrever-se
        </button>
        <p className="form__text">Já é um membro? Faça o login aqui!</p>
      </form>
    </>
  );
}
