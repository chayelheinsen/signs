class Remote {
  constructor(){
    this._token = "";
    // alert('Hello!');
  }

  setToken(token) {
    this._token = token;
  }

  requestOptions() {
    return {
      "headers": {
        "Authorization": this._token
      }
    }
  }

  herokuApps() {
    return axios.get("/api/apps/heroku", this.requestOptions());
  }
}

// const remote = new Remote();
// Object.freeze(remote);
//
// export default remote;


const remote = new Remote();