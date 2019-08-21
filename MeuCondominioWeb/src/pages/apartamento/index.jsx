import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/theme/header";
import Content from "../../components/theme/content";

const Grid = lazy(() => import("./grid"));

const Apartamento = () => {
  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }
    >
      <Header title="Apartamentos">
        <Link to="/apartamentos/adicionar" className="btn btn-primary btn-sm">
          Adicionar
        </Link>
      </Header>
      <Content>
        <Grid title="Apartamentos" />
      </Content>
    </Suspense>
  );
};

export default Apartamento;
