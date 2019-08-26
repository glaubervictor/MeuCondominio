import React, { Component } from "react";
import { withFormik } from "formik";
import VMasker from "vanilla-masker";
import { Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";

//components
import { Select, InputText } from "../../components/form";
import { Panel, Row, Column, Form, Br } from "../../components/bootstrap";
import Messages from "../../helpers/messages";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as MoradorActions } from "../../ducks/morador";
import { Creators as ApartamentoActions } from "../../ducks/apartamento";

//form
class InnerForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChangeCpf = target => {
    const { value } = target.currentTarget;
    this.props.setFieldValue(
      "cpf",
      VMasker.toPattern(
        value || "",
        value && value.length <= 14 ? "999.999.999-99" : "999.999.999-99"
      )
    );
  };

  handleChangeTelefone = target => {
    const { value } = target.currentTarget;
    this.props.setFieldValue(
      "telefone",
      VMasker.toPattern(
        value || "",
        value && value.length <= 14 ? "(99) 99999-9999" : "(99) 99999-9999"
      )
    );
  };

  handleChangeDataNascimento = target => {
    const { value } = target.currentTarget;
    this.props.setFieldValue(
      "dataNascimento",
      VMasker.toPattern(
        value || "",
        value && value.length <= 9 ? "99/99/9999" : "99/99/9999"
      )
    );
  };

  handleChange(name, value) {
    this.props.setFieldValue(name, value);
  }

  componentDidMount() {
    this.props.apartamentoActions.getAll();

    //verifica se existe id
    if (this.props.match.params.id) {
      this.props.moradorActions.get(
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
        <Panel color="primary" title="Morador">
          <Row>
            {/* apartamentoId */}
            <Select
              name="apartamentoId"
              col={12}
              handleChange={value => this.handleChange("apartamentoId", value)}
              required
              error={errors.apartamentoId}
              value={values.apartamentoId}
              label="Apartamento"
              dataSource={this.props.apartamentoReducer.records}
              loading={this.props.apartamentoReducer.loading}
            />
          </Row>
          <Panel color="default" title="Informações Pessoais">
            <Row>
              {/* nomeCompleto */}
              <InputText
                name="nomeCompleto"
                handleChange={handleChange}
                col={4}
                required
                error={errors.nomeCompleto}
                value={values.nomeCompleto}
                label="Nome Completo"
              />
              {/* cpf */}
              <InputText
                name="cpf"
                handleChange={target => this.handleChangeCpf(target)}
                col={4}
                required
                tooltip={"CPF"}
                error={errors.cpf}
                value={values.cpf}
                label="CPF"
              />
              {/* dataNascimento */}
              <InputText
                name="dataNascimento"
                handleChange={target => this.handleChangeDataNascimento(target)}
                col={4}
                required
                error={errors.dataNascimento}
                value={values.dataNascimento}
                label="Data de Nascimento"
              />
            </Row>
          </Panel>
          <Panel color="default" title="Contato">
            <Row>
              {/* telefone */}
              <InputText
                name="telefone"
                handleChange={target => this.handleChangeTelefone(target)}
                col={6}
                required
                error={errors.telefone}
                value={values.telefone}
                label="Telefone"
              />
              {/* email */}
              <InputText
                name="email"
                handleChange={handleChange}
                col={6}
                required
                error={errors.email}
                value={values.email}
                label="E-Mail"
              />
            </Row>
          </Panel>
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
              <Link to="/moradores">Cancelar</Link>
            </p>
          </Column>
        </Row>
        <Br />
      </Form>
    );
  }
}

const MoradorForm = withFormik({
  validateOnChange: false,
  mapPropsToValues: ({
    apartamentoId,
    nomeCompleto,
    dataNascimento,
    telefone,
    cpf,
    email
  }) => ({
    apartamentoId: apartamentoId || "",
    nomeCompleto: nomeCompleto || "",
    dataNascimento: dataNascimento || "",
    telefone: telefone || "",
    cpf: cpf || "",
    email: email || ""
  }),
  validationSchema: Yup.object().shape({
    apartamentoId: Yup.number().required(
      Messages.REQUIRED
    ),
    nomeCompleto: Yup.string().required("Este campo é requerido."),
    dataNascimento: Yup.string().required("Este campo é requerido."),
    telefone: Yup.string()
      .length(15, "Telefone inválido.")
      .required("Este campo é requerido."),
    cpf: Yup.string()
      .length(14, "CPF inválido.")
      .required("Este campo é requerido."),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Este campo é requerido.")
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (!props.match.params.id) {
      props.moradorActions.add(values, resetForm, setErrors, setSubmitting);
    } else {
      props.moradorActions.update(
        { id: props.match.params.id, ...values },
        setErrors,
        setSubmitting
      );
    }
  }
})(InnerForm);

const mapStateToProps = state => ({
  moradorReducer: state.MoradorReducer,
  apartamentoReducer: state.ApartamentoReducer
});

const mapDispatchToProps = dispatch => ({
  moradorActions: bindActionCreators(MoradorActions, dispatch),
  apartamentoActions: bindActionCreators(ApartamentoActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MoradorForm)
);
