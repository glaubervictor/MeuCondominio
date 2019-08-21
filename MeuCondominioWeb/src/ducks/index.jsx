import { combineReducers } from "redux";

import ApartamentoReducer from "./apartamento";
import MoradorReducer from "./morador";

export default combineReducers({
  ApartamentoReducer,
  MoradorReducer
});
