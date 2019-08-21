import api from "../services/api";
import { notification } from "antd";
import history from "../helpers/history";

/**
 * Action types
 */
export const Types = {
  LOADING: "login/LOADING"
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false
};

/**
 * Action creators
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOADING:
      return { ...state, loading: action.payload };
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
  // Auth
  auth: values => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .post("/autenticacao", values)
      .then(response => {
        const { content } = response.data;

        localStorage.setItem("meuCondominio:token", content.token);

        dispatch([
          Creators.setLoading(false),
          history.push("/apartamentos")
        ]);
      })
      .catch(() => {
        notification["error"]({
          message: "Login",
          description: "Usuário e/ou senha incorretos."
        });

        dispatch(Creators.setLoading(false));
      });
  }
};
