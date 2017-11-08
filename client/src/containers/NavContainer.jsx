import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import '../images/pawprintWhite24.png';
import axios from 'axios';


class NavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      navbarMenuClassNames: 'navbar-menu',
      navbarBurgerClassNames: 'button navbar-burger',
    };
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      const username = Auth.getUsername();
      this.setState({
        username
      });
    }
  }

  openNavbarMenu(event) {
    if (event.target.className.search('is-active') === -1) {
      this.setState({
        navbarMenuClassNames: 'navbar-menu is-active',
        navbarBurgerClassNames: 'button navbar-burger is-active',
      });
    } else {
      this.setState({
        navbarMenuClassNames: 'navbar-menu',
        navbarBurgerClassNames: 'button navbar-burger',
      });
    }
  }

  closeNavBar() {
    if (this.state.navbarBurgerClassNames.search('is-active') !== -1) {
      this.setState({
        navbarMenuClassNames: 'navbar-menu',
        navbarBurgerClassNames: 'button navbar-burger',
      });
    }
  }
  render() {
    return (
      <div className="is-fullheight">
        <div>
          <nav role="navigation" aria-label="main navigation" className="navbar is-success">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img src="../images/pawprintWhite24.png" alt="Pet Meal Tracker" id="pawprint-logo"></img> Pet Meal Tracker
              </Link>
              <button className={this.state.navbarBurgerClassNames} onClick={this.openNavbarMenu.bind(this)}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={this.state.navbarMenuClassNames} onClick={this.closeNavBar.bind(this)}>
              <div className="navbar-start">
                {/* <Link to="/track" className="navbar-item">Track</Link> */}
                <Link to="/meals" className="navbar-item">Meals</Link>
                <Link to="/stats" className="navbar-item">Stats</Link>
                <Link to="/addfood" className="navbar-item">Add Food</Link>
              </div>

              {Auth.isUserAuthenticated() ? (
                <div className="navbar-end">
                  <Link to="/account" className="navbar-item">{this.state.username}</Link>
                  <Link to="/logout" className="navbar-item">Log out</Link>
                </div>
              ) : (
                  <div className="navbar-end">
                    <Link to="/login" className="navbar-item">Log in</Link>
                    <Link to="/signup" className="navbar-item">Sign up</Link>
                  </div>
                )}

            </div>
          </nav>
        </div>
        <section className="section">
          { /* child component will be rendered here */}
          {this.props.children}
        </section>

      </div >
    )
  }
}
NavContainer.propTypes = {
  children: PropTypes.object.isRequired
};
export default NavContainer;
