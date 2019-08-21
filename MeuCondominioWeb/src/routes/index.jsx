import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//login
import LoginIndex from "../pages/login";

//apartamentos
import ApartamentoIndex from "../pages/apartamento";
import ApartamentoAdd from "../pages/apartamento/add";
import ApartamentoEdit from "../pages/apartamento/edit";

//moradores
import MoradorIndex from "../pages/morador";
import MoradorAdd from "../pages/morador/add";
import MoradorEdit from "../pages/morador/edit";

const PrivateRouter = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default class Routes extends Component {
  isAuthenticate = async () => {
    if (await !!localStorage.getItem("meuCondominio:token")) {
      debugger;
      return true;
    }
    return false;
  };

  render() {
    return (
      <Switch>
        {/* Login */}
        <Route exact path="/login" component={LoginIndex} />
        {/* Apartamentos */}
        <PrivateRouter
          exact
          authed={this.isAuthenticate()}
          path="/apartamentos"
          component={ApartamentoIndex}
        />
        <Route path="/apartamentos/adicionar" component={ApartamentoAdd} />
        <Route path="/apartamentos/editar/:id" component={ApartamentoEdit} />
        {/* Moradores */}
        <Route exact path="/moradores" component={MoradorIndex} />
        <Route path="/moradores/adicionar" component={MoradorAdd} />
        <Route path="/moradores/editar/:id" component={MoradorEdit} />
      </Switch>
    );
  }
}
