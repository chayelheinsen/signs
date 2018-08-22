class NewAppModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      herokuApps: [],
      appName: "",
      region: "",
      appNameError: "",
      isFormValid: false
    }

    this.fieldChanged = this.fieldChanged.bind(this)
    this.newAppOnSubmit = this.newAppOnSubmit.bind(this)
    this.chooseApp = this.chooseApp.bind(this)
  }

  componentDidMount() {
    const { apiAuthToken } = this.props

    const options = {
      headers: {
        "Authorization": `Bearer ${apiAuthToken}`
      }
    }

    remote.herokuApps().then((response) => {
      console.log(response)
      this.setState({ herokuApps: response.data })
    }).catch((error) => {
      console.log(error)
    })

    // axios.get("/api/apps/heroku", options).then((response) => {
    //   console.log(response)
    //   this.setState({ herokuApps: response.data })
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  createDeployForm() {
    const { appName, region, isFormValid, appNameError } = this.state

    const isAppNameInvalid = appNameError !== ""
    let appNameClass = this.appNameLengthValid() ? "valid" : ""

    if (isAppNameInvalid) {
      appNameClass = "invalid"
    }

    return (
      <div className="row">
        <form className="col s6 offset-s3" onSubmit={this.newAppOnSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input id="app-name-field" type="text" className={appNameClass}
                     name="appName"
                     value={appName}
                     onChange={this.fieldChanged}
              />
              <label htmlFor="app-name-field">App name</label>
              <span className="helper-text" data-error={appNameError} data-success="" />
            </div>
            <div className="input-field col s12">
              <select value={region} name="region" onChange={this.fieldChanged}>
                <option value="" disabled>Choose a region</option>
                <option value="United States">United States</option>
                <option value="Europe">Europe</option>
              </select>
              <label>Region</label>
            </div>
            <button className="full-width btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    disabled={!isFormValid}
            >
              Create app
            </button>
          </div>
        </form>
      </div>
    )
  }

  fieldChanged(event) {
    const { name, value } = event.target

    this.setState({ [name]: value }, this.validateForm)
  }

  validateForm() {
    const { appName, region } = this.state
    const appNameRegex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/m

    const nameValid = this.appNameLengthValid() && appNameRegex.test(appName)
    const regionValid = region.length > 0
    const valid = nameValid && regionValid

    const appNameError = nameValid ? "" : "This name should only contain lowercase letters, numbers, and dashes and be at least 3 characters long."

    this.setState({ isFormValid: valid, appNameError })
  }

  appNameLengthValid() {
    const { appName } = this.state

    return appName.length >= 3 && appName.length <= 50
  }

  newAppOnSubmit(event) {
    event.preventDefault()

    const { appName, region } = this.state
    const { apiAuthToken } = this.props

    const payload = {
      app: {
        name: appName,
        region
      }
    }

    const options = {
      headers: {
        "Authorization": `Bearer ${apiAuthToken}`
      }
    }

    axios.post("/api/apps", payload, options).then(() => {
      window.location.replace("/dashboard")
    }).catch((error) => {
      const data = error.data.errors

      let nameError = null

      if (data.name) {
        nameError = data.name
      }

      this.setState({appNameError: nameError[0]})
    })
  }

  createConnectForm() {
    const { herokuApps } = this.state

    return (
      <div className="heroku-apps row">
        {herokuApps.map((app) => {
          return (
            <button className="col s6 offset-s3 app valign-wrapper heroku-app waves-effect waves-light btn" name={app.id} key={app.id} onClick={this.chooseApp}>
              <div className="title">
                <span>{app.name}</span>
              </div>
              <div className="details">
                {app.buildpack_provided_description}
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  chooseApp(event) {
    const appID = event.target.name
    const options = {
      headers: {
        "Authorization": `Bearer ${apiAuthToken}`
      }
    }
    const payload = {
      app: {
        id: appID
      }
    }

    axios.post("/api/apps/connect", payload, options).then((response) = {

    }).catch((error) => {

    })
  }

  render() {
    return (
      <div id="new-app-modal" className="modal">
        <div className="modal-content">
          <h4>Create New App</h4>

          <ul className="collapsible">
            <li>
              <div className="collapsible-header"><i className="material-icons">cloud_download</i>Connect an App</div>
              <div className="collapsible-body">
                {this.createConnectForm()}
              </div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">cloud_upload</i>Deploy an App</div>
              <div className="collapsible-body">
                {this.createDeployForm()}
              </div>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <a href="#" className="modal-close waves-effect waves-light btn nav-red">Cancel</a>
        </div>
      </div>
    )
  }
}