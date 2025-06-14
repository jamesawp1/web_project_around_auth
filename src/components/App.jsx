import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Register from "./Register/Register.jsx";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      await api
        .getInitialUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`ERRO NA OBTENÇÃO DAS INFORMAÇÕES DE PERFIL: ${err}`);
        });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.patchUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.patchPicProfile(data).then((avatar) => {
        setCurrentUser(avatar);

        handleClosePopup();
      });
    })();
  };

  useEffect(() => {
    handleGetInitialCards();
  }, []);
  async function handleGetInitialCards() {
    const response = await api.getInitialCards();
    const cardsResponse = await response.json();

    setCards(cardsResponse);
  }

  async function handleCardDelete(card) {
    await api
      .deleteUserCard(card._id)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Erro no delete card");
        }
        setCards(
          cards.filter((currentCard) => {
            return currentCard._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(`ERRO AO EXCLUIR O CARTÃO: ${err}`);
      })
      .finally(() => {
        handleClosePopup();
      });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .changeLikeCardStatus(card._id, isLiked)
      .then((response) => response.json())
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(`ERRO AO CURTIR/DESCURTIR O CARTÃO: ${err}`);
      });
  }

  async function handleAddPlaceSubmit(card) {
    await api
      .postUserCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .finally(() => {
        handleClosePopup();
      });
  }

  return (
    <>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CurrentUserContext.Provider
                  value={{
                    currentUser,
                    handleUpdateUser,
                    handleUpdateAvatar,
                  }}
                >
                  <Header />
                  <Main
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  ></Main>
                  <Footer />
                </CurrentUserContext.Provider>
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
