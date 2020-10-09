import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "stefanini",
      storage,
      whitelist: ["auth", "obras", "autores"],
    },
    reducers
  );

  return persistedReducer;
};
