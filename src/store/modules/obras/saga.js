import { takeLatest, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

// eslint-disable-next-line require-yield
export function* updateObra({ id }) {
  try {
    history.push(`/editarObras/${id}`);
  } catch (err) {
    toast.error("Erro ao atualizar obra, confira seus dados!");
  }
}

export default all([takeLatest("@cliente/UPDATE_OBRA", updateObra)]);
