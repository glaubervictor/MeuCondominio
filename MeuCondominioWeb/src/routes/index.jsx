import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//dashboard
import DashboardIndex from "../pages/dashboard";

//apartamentos
import ApartamentoIndex from "../pages/apartamento";
import ApartamentoAdd from "../pages/apartamento/add";
import ApartamentoEdit from "../pages/apartamento/edit";

//moradores
import MoradorIndex from "../pages/morador";
import MoradorAdd from "../pages/morador/add";
import MoradorEdit from "../pages/morador/edit";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Main Page */}
        <Route exact path="/" component={DashboardIndex} />
        {/* Apartamentos */}
        <Route exact path="/apartamentos" component={ApartamentoIndex} />
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
