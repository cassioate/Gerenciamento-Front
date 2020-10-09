import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import VisualizarObras from "../pages/Obras/visualizarObras";
import VisualizarAutores from "../pages/Autores/visualizarAutores";
import CadastrarEditarAutores from "../pages/Autores/cadastrarEditarAutores";
import CadastrarEditarObras from "../pages/Obras/cadastrarEditarObras";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path="/cadastrarAutores"
        component={CadastrarEditarAutores}
        isPrivate
      />
      <Route
        path="/cadastrarObras"
        component={CadastrarEditarObras}
        isPrivate
      />

      <Route
        path="/editarObras/:id"
        component={CadastrarEditarObras}
        isPrivate
      />
      <Route
        path="/editarAutor/:id"
        component={CadastrarEditarAutores}
        isPrivate
      />
      <Route path="/visualizarObras" component={VisualizarObras} isPrivate />
      <Route
        path="/visualizarAutores"
        component={VisualizarAutores}
        isPrivate
      />
    </Switch>
  );
}
