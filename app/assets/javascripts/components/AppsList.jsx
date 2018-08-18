class AppsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  createApp(app) {
    return <AppForList app={app} key={app.attributes.name}/>
  }

  render() {
    const { currentUser, apiAuthToken, apps } = this.props

    return (
      <div className="apps-list-container">
        <div className="header valign-wrapper row">
          <a className="waves-effect waves-light btn nav-red col s1 offset-s11 modal-trigger" href="#new-app-modal">
            <i className="material-icons right">add</i>New
          </a>
        </div>
        <NewAppModal currentUser={currentUser} apiAuthToken={apiAuthToken} />
        <div className="app-list">
          {apps.sort((a, b) => a.attributes.name > b.attributes.name).map(this.createApp)}
        </div>
      </div>
    )
  }
}