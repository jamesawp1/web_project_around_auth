import logo from "../../images/header__image.png";
import menuLogo from "../../images/menuLogo.svg";
import menuLogoClose from "../../images/menuLogoClose.svg";
import { useRef, useState } from "react";

export default function Header({ emailText, onLogout, isLogged }) {
  const [checked, setChecked] = useState(false);
  const headerRef = useRef();
  const inputRef = useRef();

  const handleChange = (evt) => {
    setChecked(evt.target.checked);

    headerRef.current.style.marginTop = checked ? "45px" : "142px";
    headerRef.current.style.borderTop = checked ? "" : "1px solid #545454";
    headerRef.current.style.paddingTop = checked ? "0" : "27px";
  };

  const imageSource = checked ? menuLogoClose : menuLogo;

  return (
    <header className="header" ref={headerRef}>
      <img
        className="header__image"
        src={logo}
        alt="Logo do site Around The Us."
      />
      {isLogged && (
        <>
          <input
            type="checkbox"
            id="menu-toggle"
            className="header__menu"
            onChange={handleChange}
            ref={inputRef}
          />
          <label htmlFor="menu-toggle" className="header__menu_label">
            <img
              className="header__menu_label-icon"
              alt="Logo do menu."
              src={imageSource}
            />
          </label>
        </>
      )}
      <div
        className={`${
          isLogged ? "header__wrapper" : "header__wrapper-notLogged"
        }`}
      >
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
