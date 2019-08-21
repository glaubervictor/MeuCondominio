import React, { Component } from "react";
import { withFormik } from "formik";
import { Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";

//components
import { InputText } from "../../components/form";
import { Panel, Row, Column, Form, Br } from "../../components/bootstrap";
import Messages from "../../helpers/messages";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ApartamentoActions } from "../../ducks/apartamento";

//form
class InnerForm extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    //verifica se existe id
    if (this.props.match.params.id) {
      this.props.apartamentoActions.get(
        this.props.match.params.id,
        this.props.setValues
      );
    }
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
        <Panel color="primary" title="Apartamento">
          <Row>
            {/* numero */}
            <InputText
              name="numero"
              handleChange={handleChange}
              col={12}
              required
              error={errors.numero}
              value={values.numero}
              label="Número do Apartamento"
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
              Salvar
            </Button>
            <p className="pull-right" style={{ marginRight: 8, paddingTop: 8 }}>
              <Link to="/apartamentos">Cancelar</Link>
            </p>
          </Column>
        </Row>
        <Br />
      </Form>
    );
  }
}

const ApartamentoForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({ numero }) => ({
    numero: numero || ""
  }),
  validationSchema: Yup.object().shape({
    numero: Yup.number()
      .required(Messages.REQUIRED)
      .integer()
      .typeError(Messages.INVALID_NUMBER)
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (!props.match.params.id) {
      props.apartamentoActions.add(values, resetForm, setErrors, setSubmitting);
    } else {
      props.apartamentoActions.update(
        { id: props.match.params.id, ...values },
        setErrors,
        setSubmitting
      );
    }
  }
})(InnerForm);

const mapStateToProps = state => ({
  apartamentoReducer: state.ApartamentoReducer
});

const mapDispatchToProps = dispatch => ({
  apartamentoActions: bindActionCreators(ApartamentoActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ApartamentoForm)
);
