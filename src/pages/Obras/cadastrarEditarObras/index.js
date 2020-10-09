/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import Layout from "../../../components/Layout_Basico";
import Input from "../../../components/Formulario/Input";
import TextAreaInput from "../../../components/Formulario/TextAreaInput";
import { ButtonStyle } from "../visualizarObras/styles";

import history from "../../../services/history";

import api from "../../../services/api";

export default function CadastrarEditarObras(path) {
  const [obra, setObra] = useState();
  const [multiSelections, setMultiSelections] = useState([]);
  const [autores, setAutores] = useState([]);
  const formRef = useRef(null);
  const { id } = path.match.params;
  const { pathname } = path.location;

  async function handleInsertSubmit(data, { reset }) {
    try {
      let autores = [];
      for (var i = 0; i < multiSelections.length; i++) {
        autores.push({ nome: multiSelections[i] });
      }

      const obra = await api.post("/obras", { autores, ...data });
      toast.success(`Obra ${obra.data.nome} inserida com sucesso!`);
      reset();
    } catch (err) {
      if (err.response) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
    }
  }

  useEffect(() => {
    async function initialValue() {
      const response = await api.get(`/obras/${id}`);
      setObra(response.data);
    }
    initialValue();
  }, [id]);

  async function handleUpdate(data) {
    try {
      const obra = await api.put(`/obras/${id}`, data);
      await api.get("/autores");
      toast.success(`Obra ${obra.data.nome} atualizada com sucesso!`);
    } catch (err) {
      if (err.response) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
    }
  }

  useEffect(() => {
    async function callAutores() {
      const response = await api.get("/autores");
      setAutores(response.data);
    }
    callAutores();
  }, []);

  function back() {
    history.goBack();
  }

  return (
    <Layout
      titulo={pathname === "/cadastrarObras" ? "Cadastrar Obra" : "Editar Obra"}
    >
      <Form
        ref={formRef}
        onSubmit={
          pathname === "/cadastrarObras" ? handleInsertSubmit : handleUpdate
        }
        initialData={pathname === "/cadastrarProdutos" ? {} : obra}
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome da Obra"
              required
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataPublicacao"
              className="form-control"
              id="dataDaPublicacao"
              label="Data da Publicação"
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataExposicao"
              className="form-control"
              id="dataDaExposição"
              label="Data da Exposição"
            />
          </div>
          <div className="form-group col-md-4">
            <div class="form-group">
              <TextAreaInput
                type="text"
                name="descricao"
                className="form-control"
                id="descrica"
                label="Descrição da Obra"
                required
              />
            </div>
          </div>
          <div className="form-group col-md-1"></div>
          <div className="form-group col-md-4">
            <label htmlFor="autores">Autores</label>
            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="name"
              multiple
              onChange={setMultiSelections}
              options={autores.map((autor) => autor.nome)}
              selected={multiSelections}
              style={{ display: "flex" }}
            />
          </div>
        </div>

        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" type="reset">
            Limpar
          </Button>
          <Button className="float-right" variant="primary" type="submit">
            Enviar
          </Button>
        </ButtonStyle>

        <Button
          style={({ height: "40px" }, { margin: "7px 0px" })}
          variant="success"
          type="button"
          onClick={back}
        >
          Voltar
        </Button>
      </Form>
    </Layout>
  );
}
