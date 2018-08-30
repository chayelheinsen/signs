class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    remote.setToken(this.props.apiAuthToken)

    this.state = {
    }
  }

  render() {
    const { currentUser, apps } = this.props

    return (
      <div>
        <Navbar currentUser={currentUser} />
        <AppsList currentUser={currentUser} apps={apps} />
      </div>
    )
  }
}