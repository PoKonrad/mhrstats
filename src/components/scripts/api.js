class api {
  get refreshToken() {
    return localStorage.get("refreshToken");
  }
  set refreshToken(val) {
    localStorage.set("refreshToken", val);
  }

  get token() {
    return localStorage.get("token");
  }
  set token(val) {
    localStorage.set("token", val);
  }

  async post(url, body, auth = true) {
    return await this._fetch("POST", url, auth, body);
  }

  async get(url, auth = true) {
    return await this._fetch("GET", auth, url);
  }

  async _fetch(method, url, auth, body, afterRefresh) {
    try {
      return await fetch(url, {
        method: method,
        headers: auth
          ? {
              "Content-Type": "application/json",
              "x-access-token": this.token,
            }
          : {
              "Content-Type": "application/json",
            },
        body: body ? JSON.stringify(body) : null,
      }).then((resp) => resp.json());
    } catch (err) {
      if ((err.status === 401 && !afterRefresh) || !auth) {
        await this.refreshToken();
        return await this._fetch(method, url, body, true);
      }

      throw err;
    }
  }
}
