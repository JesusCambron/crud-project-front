import { createContext, useEffect, useState } from "react";
import { BACK_URL } from "../config";

const INITIAL_CLIENTS = [];
const INITIAL_ERRORS = { nombre: [], telefono: [], correo: [] };

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    getAllClients();
  }, []);

  const saveClient = async (client) => {
    let method, url;

    if (client.id) {
      method = "PUT";
      url = `${BACK_URL}/clients/${client.id}`;
    } else {
      method = "POST";
      url = `${BACK_URL}/clients/`;
    }

    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    })
      .then(response => response.json())
      .then(json => {
        if (json?.status) {
          setErrors(json.detail);
          return null;
        }

        if (client.id) {
          setClients(clients.map(clientAux => client.id === clientAux.id ? json : clientAux))
          setClientToEdit(null);
        } else {
          setClients([...clients, json]);
        }
        setErrors(INITIAL_ERRORS);
        setOpenForm(false);
        return json;
      })
      .catch(error => console.log(error))
  }

  const deleteClient = async (client) => {
    await fetch(`${BACK_URL}/clients/${client.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(json => {
        if (json?.status) {
          setErrors(json.detail);
          return null;
        }
        setClients(clients.filter(clientAux => client.id !== clientAux.id))
      })
      .catch(error => console.log(error))
    setClientToEdit(null);
    setOpenForm(false);
    cleanErrors();
  }

  const getAllClients = async () => {
    fetch(`${BACK_URL}/clients/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => setClients(json.clients))
      .catch(error => console.log(error))
  }

  const cleanErrors = () => {
    setErrors(INITIAL_ERRORS);
  }

  const data = {
    clients,
    clientToEdit,
    setClientToEdit,
    saveClient,
    deleteClient,
    errors,
    setOpenForm,
    openForm,
    cleanErrors
  }


  return <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
}

export { ClientProvider };
export default ClientContext