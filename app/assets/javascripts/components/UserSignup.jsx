class UserSignup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      emailError: "",
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
    const { email } = this.state

    let valid = email.length > 0 &&
                this.isPasswordValid() &&
                this.isPasswordConfirmationValid()

    this.setState({ isFormValid: valid, emailError: "" })
  }

  isPasswordValid() {
    const { password } = this.state

    return password.length >= 8
  }

  isPasswordConfirmationValid() {
    const { password, passwordConfirmation } = this.state

    return passwordConfirmation.length >= 8 && password === passwordConfirmation
  }

  onSubmit(event) {
    event.preventDefault()

    const { email, password, passwordConfirmation } = this.state
    const { authenticityToken } = this.props

    const payload = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation
      },
      authenticity_token: authenticityToken
    }

    axios.post("/users", payload).then(() => {
      window.location.replace("/dashboard")
    }).catch((error) => {
      const data = error.data
      const emailError = data.email

      if (emailError) {
        this.setState({emailError: emailError[0]})
      }
    })
  }

  render() {
    const { email, password, passwordConfirmation, isFormValid, emailError } = this.state

    const isEmailInvalid = emailError !== ""
    let emailClass = "validate"

    if (isEmailInvalid) {
      emailClass = "validate invalid"
    }

    const isPasswordValidClass = this.isPasswordValid() ? "valid" : "invalid"
    let passwordClass = "validate"

    if (password.length> 0) {
      passwordClass = `validate ${isPasswordValidClass}`
    }

    const isPasswordConfValidClass = this.isPasswordConfirmationValid() ? "valid" : "invalid"
    let passwordConfirmationClass = "validate"

    if (passwordConfirmation.length > 0) {
      passwordConfirmationClass = `validate ${isPasswordConfValidClass}`
    }

    return (
      <div className="container">
        <div className="row">
          <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className={emailClass}
                       name="email"
                       value={email}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="email">Email</label>
                <span className="helper-text" data-error={emailError} data-success="" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className={passwordClass}
                       name="password"
                       value={password}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="password">Password</label>
                <span className="helper-text" data-error="Not at least 8 characters" data-success="">
                  At least 8 characters
                </span>
              </div>
              <div className="input-field col s12">
                <input id="password-confirmation" type="password" className={passwordConfirmationClass}
                       name="passwordConfirmation"
                       value={passwordConfirmation}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="password-confirmation">Confirm Password</label>
                <span className="helper-text" data-error="Doesn't match password" data-success="">
                  At least 8 characters
                </span>
              </div>
            </div>
            <button className="full-width btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    disabled={!isFormValid}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div>
          <p className="center-align">Already have an account?</p>
          <div className="center-align">
            <a href="/login" className="btn waves-effect waves-light">Login</a>
          </div>
        </div>
      </div>
    )
  }
}