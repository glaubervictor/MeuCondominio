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

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!localStorage.getItem("meuCondominio:token") ? (
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
  render() {
    return (
      <Switch>
        {/* Login */}
        <Route exact path="/login" component={LoginIndex} />
        {/* Apartamentos */}
        <PrivateRouter
          exact
          path="/apartamentos"
          component={ApartamentoIndex}
        />
        <PrivateRouter
          path="/apartamentos/adicionar"
          component={ApartamentoAdd}
        />
        <PrivateRouter
          path="/apartamentos/editar/:id"
          component={ApartamentoEdit}
        />
        {/* Moradores */}
        <PrivateRouter exact path="/moradores" component={MoradorIndex} />
        <PrivateRouter path="/moradores/adicionar" component={MoradorAdd} />
        <PrivateRouter path="/moradores/editar/:id" component={MoradorEdit} />
      </Switch>
    );
  }
}
