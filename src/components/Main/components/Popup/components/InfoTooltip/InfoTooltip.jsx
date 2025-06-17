import checkedIcon from "../../../../../../images/checked_icon.svg";
import errorIcon from "../../../../../../images/error_icon.svg";

export default function InfoTooltip({ registerStatus }) {
  return (
    <img
      className="popup__image"
      alt="Imagem de aviso"
      src={registerStatus ? checkedIcon : errorIcon}
    />
  );
}
