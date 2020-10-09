/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import Button from "react-bootstrap/Button";
import Input from "../../../components/Formulario/Input";
import Layout from "../../../components/Layout_Basico";
import { ButtonStyle, Tab } from "./styles";

import * as actions from "../../../store/modules/obras/action";

import api from "../../../services/api";

export default function VisualizarObras({ location }) {
  const [obras, setObras] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory();

  function handleUpdate(id) {
    dispatch(actions.updateObra(id));
  }

  useEffect(() => {
    async function loadObras() {
      const response = await api.get("/obras");
      setObras(response.data);
    }
    loadObras();
  }, []);

  async function handleSubmit(data) {
    const response = await api.get(
      `/obras/filtro-publicacao?dataInicial=${data.dataInicial}&dataFinal=${data.dataFinal}`
    );
    setObras(response.data);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/obras/${id}`);
      toast.success(`A obra foi deletada com sucesso`);
    } catch (err) {
      if (err.response) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
    }
  }

  function handleInsert() {
    history.push("/cadastrarObras");
  }

  return (
    <Layout titulo="Visualizar Obras">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataInicial"
              className="form-control"
              id="dataDaPublicacao"
              label="Data Inicial"
              required
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataFinal"
              className="form-control"
              id="dataDaExposição"
              label="Data Final"
              required
            />
          </div>
        </div>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" type="reset">
            Limpar
          </Button>
          <Button variant="success" type="button" onClick={handleInsert}>
            Incluir
          </Button>
          <Button variant="primary" type="submit">
            Pesquisar
          </Button>
        </ButtonStyle>
        <Tab>
          <div className="table-responsive">
            <table className="table">
              <caption>Lista das Obras</caption>
              <thead>
                <tr>
                  <th scope="col">Nome da Obra</th>
                  <th scope="col">Descrição da Obra</th>
                  <th scope="col">Data de Publicação</th>
                  <th scope="col">Data de Exposição</th>
                  <th scope="col">Autores Associados</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {obras.map((obra) => (
                  <tr key={obra.id}>
                    <td>{obra.nome}</td>
                    <td>{obra.descricao}</td>
                    <td>{obra.dataPublicacao}</td>
                    <td>{obra.dataExposicao}</td>
                    <td>{obra.autores.map((autor) => autor.nome + " | ")}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleUpdate(obra.id)}
                      >
                        <BsPencil size={20} />
                      </button>
                    </td>
                    <td>
                      <button type="button">
                        <BsFillTrashFill
                          size={20}
                          onClick={() => handleDelete(obra.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
      </Form>
    </Layout>
  );
}
