class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  signup({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Erro na requisição. Código: ${res.status}.`)
      );
    });
  }

  signin({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Erro na requisição. Código: ${res.status}.`)
      );
    });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Erro na requisição. Código: ${res.status}.`)
      );
    });
  }
}

export const auth = new Auth({
  baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
});
