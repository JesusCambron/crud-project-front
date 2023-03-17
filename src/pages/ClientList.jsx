import React, { useContext } from 'react'
import ClientContext from '../context/ClientContext';
import ClientItem from './ClientItem';

const ClientList = () => {
  const { clients, setOpenForm } = useContext(ClientContext);
  console.log(clients.length);
  return (
    <div className="table__container">
      <div className="add__client__button__container">
        <button className='add' onClick={() => setOpenForm(true)}>Agregar cliente</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {
            clients.length > 0 ?
              clients.map(client => <ClientItem key={client.id} client={client} />) :
              <tr>
                <td colSpan={4}><h2>Sin registros</h2></td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ClientList