import { takeLatest, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

// eslint-disable-next-line require-yield
export function* updateAutor({ id }) {
  try {
    history.push(`/editarAutor/${id}`);
  } catch (err) {
    toast.error("Erro ao atualizar autor, confira seus dados!");
  }
}

export default all([takeLatest("@autor/UPDATE_AUTOR", updateAutor)]);
