export default function FormValidator({ message, isValid }) {
  return (
    <span
      className={`form__input_error ${
        !isValid ? "form__input_error_visible" : ""
      }`}
      id="input-place-title-error"
    >
      {message}
    </span>
  );
}
