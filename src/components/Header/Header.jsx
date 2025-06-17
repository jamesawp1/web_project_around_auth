import logo from "../../images/header__image.png";

export default function Header({ emailText }) {
  return (
    <header className="header">
      <img
        className="header__image"
        src={logo}
        alt="Logo do site Around The Us."
      />
      <div className="header__wrapper">
        <h3 className="header__message"></h3>
        <button className="header__button">Sair</button>
      </div>
    </header>
  );
}
