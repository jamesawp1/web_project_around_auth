import closePopupImg from "../../../../images/close_icon.png";

export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div
        className={`popup__container ${
          !title ? "popup-view-image__image-title-container" : ""
        } ${title === "Tem certeza?" ? "popup__container-confirmation" : ""}`}
      >
        <img
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
          src={closePopupImg}
        />
        {title && (
          <h3
            className={`popup__title ${
              title === "tooltip" ? "popup__title-hidden" : ""
            }`}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}
