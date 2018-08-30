class AppsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  createNewButton() {
    return (
      <a className="waves-effect waves-light btn nav-red modal-trigger" href="#new-app-modal">
        <i className="material-icons right">add</i>New
      </a>
    )
  }

  createAppList() {
    const { apps } = this.props

    if (apps.length === 0) {
      return (
        <div className="container">
          <div className="empty-state center-align">
            <span>Looks like you have no apps connected.<br />Start by connecting an app!</span>
          </div>
        </div>
      )
    }

    return (
      <div className="app-list">
        {apps.sort((a, b) => a.attributes.name > b.attributes.name).map((app) => this.createApp(app))}
      </div>
    )
  }

  createApp(app) {
    return <AppForList app={app} apiAuthToken={this.props.apiAuthToken} key={app.attributes.name} />
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className="apps-list-container">
        <div className="row">
          <div className="header valign-wrapper col s6 offset-s3">
            {this.createNewButton()}
          </div>
        </div>
        <NewAppModal currentUser={currentUser} />
        {this.createAppList()}
      </div>
    )
  }
}