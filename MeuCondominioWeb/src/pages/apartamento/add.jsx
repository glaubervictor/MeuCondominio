import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Form from "./form";
import Header from "../../components/theme/header";

const Add = () => (
  <Fragment>
    <Header title="Apartamentos">
      <Link to="/apartamentos" className="btn btn-primary btn-sm">
        Voltar
      </Link>
    </Header>
    <div className="wrapper wrapper-content">
      <div className="row">
        <div className="col-md-12">
          <Form />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Add;
