import React from "react";
import { Link } from "react-router-dom";

import Form from "./form";
import Header from "../../components/theme/header";

const Add = () => (
  <>
    <Header title="Moradores">
      <Link to="/moradores" className="btn btn-primary btn-sm">
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
  </>
);

export default Add;
