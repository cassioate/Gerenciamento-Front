/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import Select from "../../../components/Formulario/Select";
import Layout from "../../../components/Layout_Basico";
import Input from "../../../components/Formulario/Input";

import history from "../../../services/history";

import api from "../../../services/api";

const sexo = [
  {
    nome: "Masculino",
  },
  {
    nome: "Feminino",
  },
];

export default function CadastrarEditarAutores(path) {
  const formRef = useRef(null);
  const [pais, setPais] = useState([]);
  const [autor, setAutor] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const { id } = path.match.params;

  const { pathname } = path.location;

  useEffect(() => {
    async function loadPais() {
      const response = await api.get("/pais/filtro");

      setPais(response.data.content);
    }
    loadPais();
  }, []);

  async function handleInsertSubmit(data, { reset }) {
    try {
      const pais = singleSelections[0];
      const response = await api.post("/autores", { ...data, pais });
      toast.success(`Autor ${response.data.nome} inserido com sucesso`);
      reset();
    } catch (err) {
      if (err.response.data.errors) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
      if (err.response.data.msg) {
        toast.error(err.response.data.msg);
      }
    }
  }

  useEffect(() => {
    async function initialValue() {
      const response = await api.get(`/autores/${id}`);
      setAutor(response.data);
    }
    initialValue();
  }, [id]);

  async function handleUpdate(data, { reset }) {
    try {
      const pais = singleSelections[0];
      const response = await api.put(`/autores/${id}`, { ...data, pais });
      toast.success(`Autor ${response.data.nome} atualizado com sucesso`);
      reset();
    } catch (err) {
      if (err.response.data.errors) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
      if (err.response.data.msg) {
        toast.error(err.response.data.msg);
      }
    }
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <Layout
      titulo={
        pathname === "/cadastrarAutores" ? "Cadastrar Autor" : "Editar Autor"
      }
    >
      <Form
        ref={formRef}
        onSubmit={
          pathname === "/cadastrarAutores" ? handleInsertSubmit : handleUpdate
        }
        initialData={pathname === "/cadastrarAutores" ? {} : autor}
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome do Autor"
              required
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Select
              name="sexo"
              id="inputState"
              className="form-control"
              label="Sexo"
              data={sexo}
              required
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-4">
            <Input
              type="email"
              name="email"
              className="form-control"
              id="email"
              label="Email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataNascimento"
              className="form-control"
              id="dataNascimento"
              label="Data Nascimento"
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="cpf"
              name="cpf"
              className="form-control"
              id="cpf"
              label="Cpf"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <label htmlFor="pais">Pais</label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setSingleSelections}
              options={pais.map((pai) => pai.nome)}
              selected={singleSelections}
            />
          </div>
        </div>

        <Button variant="outline-secondary" type="reset">
          Limpar
        </Button>
        <Button className="float-right" variant="primary" type="submit">
          Enviar
        </Button>

        <Button
          style={({ height: "40px" }, { margin: "7px 0px" })}
          variant="success"
          type="button"
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Form>
    </Layout>
  );
}
