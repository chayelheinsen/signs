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

  connectHerokuApp(id) {
    const payload = {
      "app": {
        "id": id
      }
    }

    return axios.post("/api/apps/connect", payload, this.requestOptions())
  }

  createApp(appName, region) {
    const payload = {
      "app": {
        "name": appName,
        "region": region
      }
    }

    return axios.post("/api/apps", payload, this.requestOptions())
  }

  updateApp(id, params) {
    const payload = {
      "app": params
    }

    return axios.patch(`/api/apps/${id}`, payload,  this.requestOptions())
  }
}

// const remote = new Remote();
// Object.freeze(remote);
//
// export default remote;


const remote = new Remote();