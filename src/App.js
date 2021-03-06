import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Routes from "./routes";
import history from "./services/history";
import GlobalStyles from "./styles/global";
import { store, persistor } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer autoColse={2000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}
export default App;
