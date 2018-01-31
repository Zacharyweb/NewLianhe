class SessionService {
  tokenName = "token";
  encryptTokenName = "encryptToken";

  auth(user) {
    localStorage.setItem(this.tokenName, user.accessToken);
    localStorage.setItem(this.encryptTokenName, user.encryptedAccessToken);
  }

  getToken() {
    return {
      token: localStorage.getItem(this.tokenName),
      encryptToken: localStorage.getItem(this.encryptTokenName)
    }
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.encryptTokenName)
  }
}

export default new SessionService()
