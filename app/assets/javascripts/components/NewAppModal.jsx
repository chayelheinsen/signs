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

    const valid = appName.length > 0 && region.length > 0

    this.setState({ isFormValid: valid, appNameError: "" })
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

    axios.post("/api/app", payload, options).then(() => {
      window.location.replace("/dashboard")
    }).catch((error) => {
      const data = error.data
      const nameError = data.name

      if (nameError) {
        this.setState({appNameError: nameError[0]})
      }
    })
  }

  render() {
    const { appName, region, isFormValid, appNameError } = this.state

    const isAppNameInvalid = appNameError !== ""
    let appNameClass = "validate"

    if (isAppNameInvalid) {
      appNameClass = "validate invalid"
    }

    return (
      <div id="new-app-modal" className="modal">
        <div className="modal-content">
          <h4>Create a new app</h4>
          <p>A bunch of text</p>

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