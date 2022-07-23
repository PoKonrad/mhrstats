class api {
  get refreshToken() {
    return sessionStorage.getItem("refreshToken");
  }
  set refreshToken(val) {
    sessionStorage.setItem("refreshToken", val);
  }

  get token() {
    return sessionStorage.getItem("token");
  }
  set token(val) {
    sessionStorage.setItem("token", val);
  }

  async post(url, body, auth = true) {
    return await this._fetch("POST", url, auth, body);
  }

  async get(url, auth = true) {
    return await this._fetch("GET", url, auth);
  }

  async _fetch(method, url, auth, body, afterRefresh) {
    try {
      const data = await fetch(url, {
        method: method,
        headers: new Headers(
          auth
            ? {
                "Content-Type": "application/json",
                "x-access-token": this.token,
              }
            : {
                "Content-Type": "application/json",
              }
        ),
        body: body ? JSON.stringify(body) : null,
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw resp;
        }
      });
      return data;
    } catch (err) {
      if (err.status === 401 && !afterRefresh && auth) {
        console.log("owo");
        await this.refToken();
        return await this._fetch(method, url, body, true);
      }

      throw err;
    }
  }

  async refToken() {
    console.log("uwu");
    const resp = await this._fetch(
      "POST",
      "http://localhost:8000/auth/refreshToken",
      false,
      {
        refreshToken: this.refreshToken,
      }
    );
    this.refreshToken = resp.refreshToken;
    this.token = resp.token;
  }
}

const newApi = new api();

export default newApi;
