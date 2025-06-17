import logo from "../../images/header__image.png";

export default function Header({ emailText, onLogout }) {
  return (
    <header className="header">
      <img
        className="header__image"
        src={logo}
        alt="Logo do site Around The Us."
      />
      <div className="header__wrapper">
        <h3
          className={emailText ? "header__message" : "header__message-hidden"}
        >
          {emailText}
        </h3>
        {onLogout && (
          <button onClick={onLogout} className="header__button">
            Sair
          </button>
        )}
      </div>
    </header>
  );
}
