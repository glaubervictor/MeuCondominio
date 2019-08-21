import React, { Component } from "react";
import { withFormik } from "formik";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

//components
import { InputText } from "../../components/form";
import { Panel, Row, Column, Form, Br } from "../../components/bootstrap";
import Messages from "../../helpers/messages";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as LoginActions } from "../../ducks/login";

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
        <Panel color="primary" title="Informe seus dados">
          <Row>
            {/* email */}
            <InputText
              name="email"
              handleChange={handleChange}
              col={6}
              required
              error={errors.email}
              value={values.email}
              label="E-mail"
            />
            {/* senha */}
            <InputText
              name="senha"
              handleChange={handleChange}
              col={6}
              required
              error={errors.senha}
              value={values.senha}
              label="Senha"
            />
          </Row>
          <Row>
            <Column col="12">
              <Button
                htmlType="submit"
                className="pull-right"
                type="primary"
                loading={isSubmitting}
              >
                Acesso
              </Button>
            </Column>
          </Row>
        </Panel>
        <Br />
      </Form>
    );
  }
}

const ApartamentoForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ email, senha }) => ({
    email: email || "",
    senha: senha || ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email(Messages.INVALID_EMAIL)
      .required(Messages.REQUIRED),
    senha: Yup.string().required(Messages.REQUIRED)
  }),
  handleSubmit(values, { props }) {
    props.loginActions.auth(values);
  }
})(InnerForm);

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(LoginActions, dispatch)
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ApartamentoForm)
);
