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
import Button from "react-bootstrap/Button";
import Layout from "../../../components/Layout_Basico";
import { ButtonStyle, Tab } from "./styles";

import * as actions from "../../../store/modules/autores/action";

import api from "../../../services/api";

export default function VisualizarAutores({ location }) {
  const [autores, setAutores] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory();

  function handleUpdate(id) {
    dispatch(actions.updateAutor(id));
  }

  useEffect(() => {
    async function loadAutores() {
      const response = await api.get("/autores");
      setAutores(response.data);
    }
    loadAutores();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/autores/${id}`);
      toast.success(`Autor foi deletada com sucesso`);
    } catch (err) {
      if (err.response.data.errors) {
        err.response.data.errors.map((erro) => toast.error(erro.message));
      }
      if (err.response.data.msg) {
        toast.error(err.response.data.msg);
      }
    }
  }

  function handleInsert() {
    history.push("/cadastrarAutores");
  }

  return (
    <Layout titulo="Visualizar Autores">
      <ButtonStyle className="float-right">
        <Button variant="outline-secondary" type="reset">
          Limpar
        </Button>
        <Button variant="success" type="button" onClick={handleInsert}>
          Incluir
        </Button>
      </ButtonStyle>
      <Tab>
        <div className="table-responsive">
          <table className="table">
            <caption>Lista das Obras</caption>
            <thead>
              <tr>
                <th scope="col">Nome do Autor</th>
                <th scope="col">Sexo</th>
                <th scope="col">Email</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Pais</th>
                <th scope="col">Cpf</th>
                <th scope="col">Obras</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor) => (
                <tr key={autor.id}>
                  <td>{autor.nome}</td>
                  <td>{autor.sexo}</td>
                  <td>{autor.email}</td>
                  <td>{autor.dataNascimento}</td>
                  <td>{autor.pais}</td>
                  <td>{autor.cpf}</td>
                  <td>{autor.obras.map((obra) => obra.nome + " | ")}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleUpdate(autor.id)}
                    >
                      <BsPencil size={20} />
                    </button>
                  </td>
                  <td>
                    <button type="button">
                      <BsFillTrashFill
                        size={20}
                        onClick={() => handleDelete(autor.id)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tab>
    </Layout>
  );
}
