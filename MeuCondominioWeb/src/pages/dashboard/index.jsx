import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import Header from "../../components/theme/header";
import Content from "../../components/theme/content";

class Index extends Component {
  render() {
    return (
      <div>
        <Header title="Dashboard">
          <Link to="/home" className="btn btn-warning btn-sm">
            Voltar
          </Link>
        </Header>
        <Content>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center m-t-lg">
                <h1>Página dashboard</h1>
                <Button>Ok</Button>
                <small />
              </div>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default Index;
