import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/theme/header";
import Content from "../../components/theme/content";

const Grid = lazy(() => import("./grid"));

const Morador = () => {
  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }
    >
      <Header title="Moradores">
        <Link to="/moradores/adicionar" className="btn btn-primary btn-sm">
          Adicionar
        </Link>
      </Header>
      <Content>
        <Grid title="Moradores" />
      </Content>
    </Suspense>
  );
};

export default Morador;
