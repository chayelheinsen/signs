class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { currentUser, authenticityToken, apiAuthToken } = this.props

    return (
      <div>
        <Navbar currentUser={currentUser} />
        <AppsList currentUser={currentUser} authenticityToken={authenticityToken} apiAuthToken={apiAuthToken} />
      </div>
    )
  }
}