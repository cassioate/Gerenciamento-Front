import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import obras from "./obras/saga";
import autores from "./autores/saga";

export default function* rootSaga() {
  return yield all([auth, obras, autores]);
}
