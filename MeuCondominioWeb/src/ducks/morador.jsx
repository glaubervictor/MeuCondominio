import api from "../services/api";
import { notification } from "antd";
import history from "../helpers/history";

/**
 * Action types
 */
export const Types = {
  LOADING: "morador/LOADING",
  GET_ALL: "morador/GET_ALL"
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  records: []
};

/**
 * Action creators
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOADING:
      return { ...state, loading: action.payload };
    case Types.GET_ALL:
      return { ...state, records: action.payload };
    default:
      return state;
  }
};

/**
 * Creators
 */
export const Creators = {
  setLoading: loading => ({
    type: Types.LOADING,
    payload: loading
  }),
  // Get morador
  get: (id, setValues) => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get(`/moradores/${id}`)
      .then(response => {
        const {
          apartamentoId,
          nomeCompleto,
          cpf,
          dataNascimentoFormatada,
          telefone,
          email
        } = response.data.content;

        const values = {
          apartamentoId,
          nomeCompleto,
          cpf,
          dataNascimento: dataNascimentoFormatada,
          telefone,
          email
        };

        dispatch([setValues(values), Creators.setLoading(false)]);
      })
      .catch(() => {
        dispatch(Creators.setLoading(false));
      });
  },
  // Get all moradores
  getAll: () => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get("/moradores")
      .then(response => {
        const { content } = response.data;
        dispatch([
          Creators.setLoading(false),
          { type: Types.GET_ALL, payload: content }
        ]);
      })
      .catch(() => {
        dispatch(Creators.setLoading(false));
      });
  },
  // Get all moradores by description
  getByDescription: (description, setSubmitting) => dispatch => {
    dispatch([Creators.setLoading(true), setSubmitting(true)]);
    debugger;
    api
      .get(`/moradores/search?description=${description}`)
      .then(response => {
        const { content } = response.data;
        dispatch([
          Creators.setLoading(false),
          setSubmitting(false),
          { type: Types.GET_ALL, payload: content }
        ]);
      })
      .catch(() => {
        dispatch([Creators.setLoading(false), setSubmitting(false)]);
      });
  },
  // Add morador
  add: (values, resetForm, setErrors, setSubmitting) => dispatch => {
    dispatch([Creators.setLoading(true), setSubmitting(true)]);
    api
      .post("/moradores", values)
      .then(() => {
        notification["success"]({
          message: "Moradores",
          description: "Morador adicionado com sucesso."
        });

        dispatch([
          resetForm(),
          setSubmitting(false),
          Creators.setLoading(false),
          history.push("/moradores")
        ]);
      })
      .catch(ex => {
        ex && setErrors(ex.errors);

        notification["error"]({
          message: "Moradores",
          description:
            "Não foi possível efetuar a transação. Por favor tente novamente."
        });

        dispatch([Creators.setLoading(false), setSubmitting(false)]);
      });
  },
  // Update apartamento
  update: (values, setErrors, setSubmitting) => dispatch => {
    dispatch([Creators.setLoading(true), setSubmitting(true)]);
    api
      .put("/moradores", values)
      .then(() => {
        notification["success"]({
          message: "Moradores",
          description: "Morador atualizado com sucesso."
        });

        dispatch([
          setSubmitting(false),
          Creators.setLoading(false),
          history.push("/moradores")
        ]);
      })
      .catch(ex => {
        ex && setErrors(ex.errors);

        notification["error"]({
          message: "Moradores",
          description:
            "Não foi possível efetuar a transação. Por favor tente novamente."
        });

        dispatch([Creators.setLoading(false), setSubmitting(false)]);
      });
  },
  remove: id => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .delete(`/moradores/${id}`)
      .then(() => {
        notification["success"]({
          message: "Moradores",
          description: "Morador removido com sucesso."
        });

        dispatch([Creators.setLoading(false), Creators.getAll()]);
      })
      .catch(ex => {
        notification["error"]({
          message: "Moradores",
          description:
            "Não foi possível efetuar a transação. Por favor tente novamente."
        });

        dispatch([Creators.setLoading(false)]);
      });
  }
};
