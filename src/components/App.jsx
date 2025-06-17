import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loggedin, setLoggedin] = useState(false);
  const [data, setData] = useState("");

  const navigate = useNavigate();

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

  async function handleUserSignup(data) {
    await auth
      .signup(data)
      .then((userInfo) => {
        if (userInfo) {
          const infoTooltipTrue = {
            children: <InfoTooltip registerStatus={true} />,
          };
          setPopup(infoTooltipTrue);
        }
      })
      .catch((err) => {
        if (err) {
          const infoTooltipFalse = {
            children: <InfoTooltip registerStatus={false} />,
          };
          setPopup(infoTooltipFalse);
        }
      });
  }

  async function handleUserSignin(data) {
    await auth
      .signin(data)
      .then((userToken) => {
        localStorage.setItem("jwt", JSON.stringify(userToken));
        setLoggedin(true);
        setData(data.email);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  async function handleCheckToken() {
    const token = JSON.parse(localStorage.getItem("jwt"));

    if (!token) {
      setLoggedin(false);
      navigate("/signin");
      return;
    }

    await auth
      .checkToken(token.token)
      .then((userData) => {
        setData(userData.data.email);
        setLoggedin(true);
        navigate("/");
      })
      .catch((err) => console.log(`ERRO AQUI: ${err}`));
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedin={loggedin}>
                <CurrentUserContext.Provider
                  value={{
                    currentUser,
                    handleUpdateUser,
                    handleUpdateAvatar,
                  }}
                >
                  <Header emailText={data} />
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
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                <Header emailText={"Inscreva-se"} />
                <Register
                  onRegister={handleUserSignup}
                  popup={popup}
                  onClosePopup={handleClosePopup}
                />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Header emailText={"Faça o login"} />
                <Login onLogin={handleUserSignin} />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
