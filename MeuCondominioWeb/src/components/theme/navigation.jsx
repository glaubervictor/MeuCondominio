import React, { Component } from "react";
import $ from "jquery";

import MenuItem from "./menuItem";
import MenuTree from "./menuTree";

import { smoothlyMenu } from "./helpers/helpers";

class Navigation extends Component {
  componentWillUpdate(nextProps, nextState) {
    $("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  componentDidMount() {
    const { menu } = this.refs;
    $(function() {
      $(menu).metisMenu({
        toggle: true
      });
    });
  }

  render() {
    let hrefLink = "#";
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul
            className="nav metismenu"
            id="side-menu"
            ref="menu"
            style={{ zIndex: 2000 }}
          >
            <li className="nav-header">
              <div className="dropdown profile-element">
                {/* <img className="rounded-circle" alt="Perfil" /> */}
                {/* <a data-toggle="dropdown" className="dropdown-toggle" href={hrefLink}>
                  <span className="block m-t-xs font-bold"></span>
                  <span className="text-muted text-xs block">
                    Art Director <b className="caret" />
                  </span>
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li>
                    <a className="dropdown-item" href="profile.html">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="contacts.html">
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="mailbox.html">
                      Mailbox
                    </a>
                  </li>
                  <li className="dropdown-divider" />
                  <li>
                    <a className="dropdown-item" href="login.html">
                      Logout
                    </a>
                  </li>
                </ul> */}
              </div>
              <div className="logo-element">MC</div>
            </li>
            {/* menu */}
            {/* <MenuItem path="/home" icon="home" label="Home" /> */}
            <MenuItem path="/apartamentos" icon="building" label="Apartamentos" />
            <MenuItem path="/moradores" icon="user" label="Moradores" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
