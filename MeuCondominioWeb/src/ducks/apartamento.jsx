import api from "../services/api";
import { notification } from "antd";
import history from "../helpers/history";

/**
 * Action types
 */
export const Types = {
  LOADING: "apartamento/LOADING",
  GET_ALL: "apartamento/GET_ALL"
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
  // Get apartamento
  get: (id, setValues) => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get(`/apartamentos/${id}`)
      .then(response => {
        const { content } = response.data;
        dispatch([setValues(content), Creators.setLoading(false)]);
      })
      .catch(() => {
        dispatch(Creators.setLoading(false));
      });
  },
  // Get all apartamentos
  getAll: () => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get("/apartamentos")
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
  // Add apartamento
  add: (values, resetForm, setErrors, setSubmitting) => dispatch => {
    dispatch([Creators.setLoading(true), setSubmitting(true)]);
    api
      .post("/apartamentos", values)
      .then(() => {
        notification["success"]({
          message: "Apartamentos",
          description: "Apartamento adicionado com sucesso."
        });

        dispatch([
          resetForm(),
          setSubmitting(false),
          Creators.setLoading(false),
          history.push("/apartamentos")
        ]);
      })
      .catch(ex => {
        ex && setErrors(ex.errors);

        notification["error"]({
          message: "Apartamentos",
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
      .put("/apartamentos", values)
      .then(() => {
        notification["success"]({
          message: "Apartamentos",
          description: "Apartamento atualizado com sucesso."
        });

        dispatch([
          setSubmitting(false),
          Creators.setLoading(false),
          history.push("/apartamentos")
        ]);
      })
      .catch(ex => {
        ex && setErrors(ex.errors);

        notification["error"]({
          message: "Apartamentos",
          description:
            "Não foi possível efetuar a transação. Por favor tente novamente."
        });

        dispatch([Creators.setLoading(false), setSubmitting(false)]);
      });
  },
  remove: id => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .delete(`/apartamentos/${id}`)
      .then(() => {
        notification["success"]({
          message: "Apartamentos",
          description: "Apartamento removido com sucesso."
        });

        dispatch([Creators.setLoading(false), Creators.getAll()]);
      })
      .catch(ex => {
        notification["error"]({
          message: "Apartamentos",
          description:
            "Não foi possível efetuar a transação. Por favor tente novamente."
        });

        dispatch([Creators.setLoading(false)]);
      });
  }
};
