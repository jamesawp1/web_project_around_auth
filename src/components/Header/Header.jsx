import logo from "../../images/header__image.png";
import menuLogo from "../../images/menuLogo.svg";
import { useRef } from "react";

export default function Header({ emailText, onLogout }) {
  const headerRef = useRef();

  const handleChange = (evt) => {
    const isChecked = evt.target.checked;

    headerRef.current.style.marginTop = isChecked ? "142px" : "45px";
    headerRef.current.style.borderTop = isChecked ? "1px solid #545454" : "";
    headerRef.current.style.paddingTop = isChecked ? "27px" : "0";
  };

  return (
    <header className="header" ref={headerRef}>
      <img
        className="header__image"
        src={logo}
        alt="Logo do site Around The Us."
      />
      <input
        type="checkbox"
        id="menu-toggle"
        className="header__menu"
        onChange={handleChange}
      />
      <label htmlFor="menu-toggle" className="header__menu_label">
        <img
          className="header__menu_label-icon"
          alt="Logo do menu."
          src={menuLogo}
        />
      </label>
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
