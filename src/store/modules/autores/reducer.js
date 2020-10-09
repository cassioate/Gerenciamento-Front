import produce from "immer";

const INITIAL_STATE = {
  id: null,
};

export default function autor(state = INITIAL_STATE, action) {
  // eslint-disable-next-line consistent-return
  return produce(state, (draft) => {
    switch (action.type) {
      case "@autor/UPDATE_AUTOR": {
        draft.id = action.id;
        break;
      }

      default:
        return state;
    }
  });
}
