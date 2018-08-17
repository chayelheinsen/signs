class UserLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      error: null,
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
    const { email, password } = this.state

    let valid = email.length > 0 && password.length > 0

    this.setState({ isFormValid: valid })
  }

  onSubmit(event) {
    event.preventDefault()

    const { email, password } = this.state
    const { authenticityToken } = this.props

    const payload = {
      session: {
        email,
        password
      },
      authenticity_token: authenticityToken
    }

    axios.post("/login", payload).then(() => {
      window.location.replace("/dashboard")
    }).catch((error) => {
      const e = error.data.error

      if (e) {
        this.setState({error: e, password: ""})
      }
    })
  }

  render() {
    const { email, password, isFormValid, error } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="error-container col s6 offset-s3">
            <p className="center-align red-text">{error}</p>
          </div>
        </div>
        <div className="row">
          <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate"
                       name="email"
                       value={email}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate"
                       name="password"
                       value={password}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="full-width btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    disabled={!isFormValid}
            >
              Login
            </button>
          </form>
        </div>
        <div>
          <p className="center-align">Don't have an account?</p>
          <div className="center-align">
            <a href="/users/new" className="btn waves-effect waves-light">Signup</a>
          </div>
        </div>
      </div>
    )
  }
}