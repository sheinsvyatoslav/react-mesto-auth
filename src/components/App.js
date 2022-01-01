import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import DeleteCardPopup from './DeleteCardPopup'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CardsContext} from '../contexts/CardsContext'
import api from "../utils/api"

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [deletedCard, setdeletedCard] = React.useState({})

  React.useEffect(() => {
    api.getUserInfo()
    .then(userData => {
      setCurrentUser(userData)
    })
    .catch((err) => {
        console.log(err);
    })
    api.getInitialCards()
    .then((cards) => {
      setCards(cards)
     })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  //открытие попапов
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setdeletedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClose);
    } 
  }, [])

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    api.addCard({name: data.place, link: data.image})
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //обновление инфо о пользователе
  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
    .then(userData => {
      setCurrentUser(userData)
      console.log(userData)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  } 

  //обновление аватара
  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
    .then(data => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //ставим/убираем лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    !isLiked ? 
    api.putLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }) :
    api.removeLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete() {
    console.log(deletedCard)
    api.deleteCard(deletedCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== deletedCard._id))
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleDeleteCardClick} 
          cards={cards}
        />
        <Footer />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddCard={handleAddPlaceSubmit}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}
