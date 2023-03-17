import React, { useContext } from 'react'
import ClientContext from '../context/ClientContext';

const ClientItem = ({ client }) => {
  const { id, nombre, correo, telefono } = client;
  const { setClientToEdit, setOpenForm } = useContext(ClientContext);

  const onClientClick = (client) => {
    setClientToEdit(client);
    setOpenForm(true);
  }

  return (
    <tr onClick={() => onClientClick(client)}>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{correo}</td>
      <td>{telefono}</td>
    </tr>
  )
}

export default ClientItem