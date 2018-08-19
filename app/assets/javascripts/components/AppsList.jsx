class AppsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  createApp(app) {
    return <AppForList app={app} apiAuthToken={this.props.apiAuthToken} key={app.attributes.name} />
  }

  render() {
    const { currentUser, apiAuthToken, apps } = this.props

    return (
      <div className="apps-list-container">
        <div className="row">
          <div className="header valign-wrapper col s6 offset-s3">
            <a className="waves-effect waves-light btn nav-red modal-trigger" href="#new-app-modal">
              <i className="material-icons right">add</i>New
            </a>
          </div>
        </div>
        <NewAppModal currentUser={currentUser} apiAuthToken={apiAuthToken} />
        <div className="app-list">
          {apps.sort((a, b) => a.attributes.name > b.attributes.name).map((app) => this.createApp(app))}
        </div>
      </div>
    )
  }
}