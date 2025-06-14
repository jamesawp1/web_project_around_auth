import logo from "../../images/header__image.png";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__image"
        src={logo}
        alt="Logo do site Around The Us."
      />
    </header>
  );
}
