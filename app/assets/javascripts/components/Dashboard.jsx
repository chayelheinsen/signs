class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} />
        <AppsList currentUser={this.props.currentUser} />
      </div>
    )
  }
}