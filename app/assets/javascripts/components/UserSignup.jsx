class UserSignup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: ""
    }

    this.fieldChanged = this.fieldChanged.bind(this)
  }

  fieldChanged(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate"
                       name="email"
                       value={email}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate"
                       name="password"
                       value={password}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input id="password-confirmation" type="password" className="validate"
                       name="passwordConfirmation"
                       value={passwordConfirmation}
                       onChange={this.fieldChanged}
                />
                <label htmlFor="password-confirmation">Confirm Password</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}