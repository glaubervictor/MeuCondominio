import React, { Component } from "react";
import $ from "jquery";

import { smoothlyMenu } from "./helpers/helpers";

class TopHeader extends Component {
  toggleNavigation(e) {
    e.preventDefault();
    $("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  render() {
    let hrefLink = "#";
    return (
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top"
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary"
              onClick={e => this.toggleNavigation(e)}
              href={hrefLink}
            >
              <i className="fa fa-bars" />{" "}
            </a>
            <form
              role="search"
              className="navbar-form-custom"
              method="post"
              action="#"
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  name="top-search"
                  id="top-search"
                />
              </div>
            </form>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a href={hrefLink} onClick={() => localStorage.clear()}>
                <i className="fa fa-sign-out" /> Sair
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopHeader;
