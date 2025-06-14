export default function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <>
      <img className="popup-view-image__image" src={link} alt={name} />
      <p className="popup-view-image__title">{name}</p>
    </>
  );
}
