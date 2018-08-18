class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div className="navbar-fixed">
        <ul id="account-dropdown" className="dropdown-content">
          <li><a href="/">one</a></li>
          <li><a href="#!">two</a></li>
          <li className="divider"></li>
          <li><a href="/logout" data-method="delete" data-confirm="Are you sure?" rel="nofollow">Logout</a></li>
        </ul>

        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Signs</a>
            <a href="#" data-target="mobile-nav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
              <li>
                <a className="dropdown-trigger" href="#" data-target="account-dropdown">
                  Account<i className="material-icons right">arrow_drop_down</i></a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-nav">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">Javascript</a></li>
          <li><a href="mobile.html">Mobile</a></li>
        </ul>
      </div>
    )
  }
}