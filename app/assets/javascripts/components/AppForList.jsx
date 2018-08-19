class AppForList extends React.Component {
  constructor(props) {
    super(props)
    const { app } = this.props

    this.state = { app }

    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  toggleFavorite(event) {
    const { app } = this.state
    const { apiAuthToken } = this.props
    const update = !app.attributes.favorite
    app.attributes.favorite = update

    const payload = {
      app: {
        favorite: update
      }
    }

    const options = {
      headers: {
        "Authorization": `Bearer ${apiAuthToken}`
      }
    }

    axios.patch(`/api/apps/${app.id}`, payload, options).then((response) => {
      console.log(response)
      this.setState({app})
    })
  }

  detailsText() {
    const { app } = this.state

    const type = app.attributes.type === "None" ? "" : `${app.attributes.type} • `
    const server = app.attributes.server.length === 0 ? "Not Deployed" : app.attributes.server

    return (
      <span>{type}{server} • {app.attributes.region}</span>
    )
  }

  render() {
    const { app } = this.state
    const favoriteIcon = app.attributes.favorite ? "favorite" : "favorite_border"

    return (
      <div className="app-container row" key={app.attributes.name}>
        <div className="app col s6 offset-s3 valign-wrapper">
          <div className="title">
            <i className="material-icons left nav-red-text">storage</i>
            <span>{app.attributes.name}</span>
          </div>
          <div className="details">
            {this.detailsText()}
            <a className="btn-flat" onClick={this.toggleFavorite}>
              <i className="material-icons right nav-red-text">{favoriteIcon}</i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}