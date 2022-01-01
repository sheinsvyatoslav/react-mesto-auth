export default function PopupWithForm (props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.openedPopupClassName}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form form_type_${props.name}`} name={`form_${props.name}`} onSubmit={props.onSubmit}>
          <fieldset className="form__set">
            {props.children}
            <button className="form__button" type="submit">{props.submitButtonName}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}