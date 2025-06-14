export default function PopupConfirmation(props) {
  const { card, onDelete } = props;

  function handleSubmit(event) {
    event.preventDefault();

    onDelete(card);
  }

  return (
    <div className="popup-confirmation">
      <div className="popup__container-confirmation">
        <button type="submit" className="popup__button" onClick={handleSubmit}>
          Sim
        </button>
      </div>
    </div>
  );
}
