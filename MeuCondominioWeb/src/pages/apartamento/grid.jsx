import React, { Component } from "react";
import { Table, Tooltip, Popconfirm } from "antd";
import { withRouter } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ApartamentoActions } from "../../ducks/apartamento";

class GridApartamento extends Component {
  constructor(props) {
    super(props);

    this.apartamentoCollumns = [
      {
        title: "Número do Apartamento",
        dataIndex: "numero"
      },
      {
        title: "Quantidade de Moradores",
        dataIndex: "quantidadeMoradores"
      },
      {
        title: "Editar",

        dataIndex: "editar",
        render: (text, record) => {
          return (
            <>
              <Tooltip title="Alterar">
                <button
                  onClick={() =>
                    this.props.history.push(`/apartamentos/editar/${record.id}`)
                  }
                  className="btn btn-sm btn-primary"
                >
                  <i className="fa fa-pencil" />
                </button>
              </Tooltip>
            </>
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
                onConfirm={() =>
                  this.props.apartamentoActions.remove(record.id)
                }
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
    this.props.apartamentoActions.getAll(0, 10);
  }

  render() {
    const { title } = this.props;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">{title}</div>
        <div className="panel-body no-padding">
          <Table
            pagination={NaN}
            loading={this.props.apartamentoReducer.loading}
            rowKey="id"
            dataSource={this.props.apartamentoReducer.records}
            columns={this.apartamentoCollumns}
          />
        </div>
      </div>
    );
  }
}

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
  )(GridApartamento)
);
