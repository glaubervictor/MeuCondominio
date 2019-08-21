import React, { Component } from "react";
import { withFormik } from "formik";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

//components
import { InputText } from "../../components/form";
import { Panel, Row, Column, Form, Br } from "../../components/bootstrap";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as MoradorActions } from "../../ducks/morador";

//form
class InnerForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      values,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange
    } = this.props;
    return (
      <Form handleSubmit={handleSubmit}>
        <Panel color="primary" title="Pesquisa">
          <Row>
            {/* descricao */}
            <InputText
              name="descricao"
              handleChange={handleChange}
              col={12}
              required
              error={errors.descricao}
              value={values.descricao}
              label="Informe os dados a serem pesquisados"
            />
          </Row>
        </Panel>
        <Row>
          <Column col="12">
            <Button
              htmlType="submit"
              className="pull-right"
              type="primary"
              loading={isSubmitting}
            >
              Pesquisar
            </Button>
          </Column>
        </Row>
        <Br />
      </Form>
    );
  }
}

const PesquisaForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ descricao }) => ({
    descricao: descricao || ""
  }),
  validationSchema: Yup.object().shape({
    descricao: Yup.string().required("Este campo é requerido.")
  }),
  handleSubmit(values, { props, setSubmitting }) {
    props.moradorActions.getByDescription(values.descricao, setSubmitting);
  }
})(InnerForm);

const mapDispatchToProps = dispatch => ({
  moradorActions: bindActionCreators(MoradorActions, dispatch)
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(PesquisaForm)
);
