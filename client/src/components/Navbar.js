import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, } from "semantic-ui-react";
import { Link, withRouter, } from "react-router-dom";

class Navbar extends React.Component {

  rightNavItems = () => {
    const  { auth: { user, handleLogout, } } = this.props;

    if (user) {
      return (
        <Menu.Menu position="right">
          <Menu.Item 
            name="Logout"
            onClick={() => handleLogout(this.props.history)}
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item 
              name="Login"
              />
          </Link>
          <Link to="/register">
            <Menu.Item 
              name="Register"
              />
          </Link>
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Menu secondary pointing>
          <Link to="/">
            <Menu.Item name="home" />
          </Link>
          { this.rightNavItems() }
        </Menu>
      </div>
    )
  }
}

const ConnectedNavbar = (props) => (
  <AuthConsumer>
    { auth => (
      <Navbar { ...props } auth={auth} />
    )}
  </AuthConsumer>
)

export default withRouter(ConnectedNavbar);
