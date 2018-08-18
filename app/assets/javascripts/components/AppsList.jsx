class AppsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  createApp(app) {
    return <AppForList app={app} key={app.name}/>
  }

  render() {
    const { currentUser, apiAuthToken } = this.props

    const apps = [
      {
        name: "Orlando Magic",
        type: "Ruby",
        region: "United States",
        server: "t2.large",
        favorite: false
      },
      {
        name: "Signs",
        type: "Node",
        region: "United States",
        server: "t2.xlarge",
        favorite: true
      },
      {
        name: "Dolent Caramel",
        type: "Node",
        region: "United States",
        server: "t2.micro",
        favorite: true
      }
    ]

    return (
      <div className="apps-list-container">
        <div className="header valign-wrapper row">
          <a className="waves-effect waves-light btn nav-red col s1 offset-s11 modal-trigger" href="#new-app-modal">
            <i className="material-icons right">add</i>New
          </a>
        </div>
        <NewAppModal currentUser={currentUser} apiAuthToken={apiAuthToken} />
        {/*{TODO: Refactor this to use apps from props}*/}
        <div className="app-list">
          {apps.map(this.createApp)}
        </div>
      </div>
    )
  }
}