import checkedIcon from "../../../../../../images/checked_icon.svg";
import errorIcon from "../../../../../../images/error_icon.svg";

export default function InfoTooltip({ registerStatus }) {
  let textMessage = registerStatus
    ? "Parabéns! Você foi registrado!"
    : "Ops, algo deu errado! Por favor, tente novamente.";
  return (
    <div className="popup__tooltip">
      <img
        className="popup__image"
        alt="Imagem de aviso"
        src={registerStatus ? checkedIcon : errorIcon}
      />
      <p className="popup__tooltip_title">{textMessage}</p>
    </div>
  );
}
