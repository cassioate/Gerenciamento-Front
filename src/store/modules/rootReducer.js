import { combineReducers } from "redux";

import auth from "./auth/reducer";
import obras from "./obras/reducer";
import autores from "./autores/reducer";

const reducers = combineReducers({
  auth,
  obras,
  autores,
});

export default reducers;
