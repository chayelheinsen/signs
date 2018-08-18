class AppForList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  toggleFavorite(event) {
    const icon = event.target.innerHTML

    event.target.innerHTML = icon === "favorite" ? "favorite_border" : "favorite"
  }

  render() {
    const { app } = this.props

    const server = app.attributes.server.length === 0 ? "Not Deployed" : app.attributes.server

    return (
      <div className="app-container row" key={app.attributes.name}>
        <div className="app col s6 offset-s3 valign-wrapper">
          <div className="title">
            <i className="material-icons left nav-red-text">storage</i>
            <span>{app.attributes.name}</span>
          </div>
          <div className="details">
            <div>{app.attributes.type} • {server} • {app.attributes.region}</div>
            <a className="btn-flat" onClick={this.toggleFavorite}>
              <i className="material-icons right nav-red-text">favorite_border</i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}