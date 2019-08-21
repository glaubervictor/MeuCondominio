import React, { Component } from "react";
import { Table, Tooltip, Popconfirm } from "antd";
import { withRouter } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as MoradorActions } from "../../ducks/morador";

class GridMorador extends Component {
  constructor(props) {
    super(props);

    this.moradorCollumns = [
      {
        title: "Nome",
        dataIndex: "nomeCompleto"
      },
      {
        title: "CPF",
        dataIndex: "cpf"
      },
      {
        title: "Data de Nascimento",
        dataIndex: "dataNascimentoFormatada"
      },
      {
        title: "E-mail",
        dataIndex: "email"
      },
      {
        title: "Ação",
        dataIndex: "acao",
        render: (text, record) => {
          return (
            <div>
              <Tooltip title="Alterar">
                <button
                  onClick={() =>
                    this.props.history.push(`/moradores/editar/${record.id}`)
                  }
                  className="btn btn-sm btn-primary"
                >
                  <i className="fa fa-pencil" />
                </button>
              </Tooltip>
            </div>
          );
        }
      },
      {
        title: "Remover",
        dataIndex: "remover",
        render: (text, record) => {
          return (
            <>
              <Popconfirm
                title="Tem certeza que deseja remover?"
                onConfirm={() => this.props.moradorActions.remove(record.id)}
              >
                <button className="btn btn-sm btn-danger">
                  <i className="fa fa-trash" />
                </button>
              </Popconfirm>
            </>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.props.moradorActions.getAll();
  }

  render() {
    const { title } = this.props;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">{title}</div>
        <div className="panel-body no-padding">
          <Table
            pagination={NaN}
            loading={this.props.moradorReducer.loading}
            rowKey="id"
            dataSource={this.props.moradorReducer.records}
            columns={this.moradorCollumns}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moradorReducer: state.MoradorReducer
});

const mapDispatchToProps = dispatch => ({
  moradorActions: bindActionCreators(MoradorActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GridMorador)
);
