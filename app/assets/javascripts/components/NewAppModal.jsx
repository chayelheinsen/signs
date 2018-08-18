class NewAppModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      appName: "",
      region: "",
      appNameError: "",
      isFormValid: false
    }

    this.fieldChanged = this.fieldChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  fieldChanged(event) {
    const { name, value } = event.target

    this.setState({ [name]: value }, this.validateForm)
  }

  validateForm() {
    const { appName, region } = this.state
    const appNameRegex = /^([a-z0-9]+[-]*[a-z0-9]+[-]*[a-z0-9]+)$/m

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

  onSubmit(event) {
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

  render() {
    const { appName, region, isFormValid, appNameError } = this.state

    const isAppNameInvalid = appNameError !== ""
    let appNameClass = this.appNameLengthValid() ? "valid" : ""

    if (isAppNameInvalid) {
      appNameClass = "invalid"
    }

    return (
      <div id="new-app-modal" className="modal">
        <div className="modal-content">
          <h4>Create New App</h4>
          <div className="row">
            <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
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

        </div>
        <div className="modal-footer">
          <a href="#" className="modal-close waves-effect waves-light btn nav-red">Cancel</a>
        </div>
      </div>
    )
  }
}