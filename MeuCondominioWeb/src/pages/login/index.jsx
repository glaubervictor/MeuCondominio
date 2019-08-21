import React from "react";

import Form from "./form";
import Header from "../../components/theme/header";

const Login = () => (
  <>
    <Header title="Acesso" />
    <div className="wrapper wrapper-content">
      <div className="row">
        <div className="col-md-12">
          <Form />
        </div>
      </div>
    </div>
  </>
);

export default Login;
