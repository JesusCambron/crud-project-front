import React, { useContext, useEffect, useState } from 'react'
import ClientContext from '../context/ClientContext';

const INITIAL_CLIENT = {
  id: null,
  nombre: "",
  correo: "",
  telefono: ""
}

const ClientForm = () => {
  const [client, setClient] = useState(INITIAL_CLIENT);
  const { clientToEdit, saveClient, deleteClient, setClientToEdit, errors, cleanErrors, openForm, setOpenForm } = useContext(ClientContext)

  useEffect(() => {
    if (clientToEdit) {
      setClient(clientToEdit);
    } else {
      setClient(INITIAL_CLIENT);
    }
  }, [clientToEdit])

  const onSubmit = async (e) => {
    e.preventDefault();
    const newClient = await saveClient(client);
    if (newClient) setClient(INITIAL_CLIENT);
  }

  const onChange = (e) => {
    e.preventDefault();
    setClient({ ...client, [e.target.name]: e.target.value })
  }

  return (
    <section className={`modal ${openForm ? "display-block" : "display-none"}`}>
      <div className="card">

        <div className="subtitle__form__container">
          <h2>{clientToEdit ? "Información del cliente" : "Crear cliente"}</h2>
        </div>
        <div className="client__form__container">
          <form onSubmit={e => onSubmit(e)}>
            <div className="input-container">
              {/* <FiUser size={20} className="icon-input" /> */}
              {/* <input type="text" name="nombre" id="nombre" placeholder=" " className={`form-input${errorsForm.nombre.length ? " input-error" : ""}`} required value={account.nombre || ""} onChange={e => onChange(e)} /> */}
              <input type="text" name="nombre" id="nombre" placeholder=" " required className='form-input' value={client.nombre} onChange={e => onChange(e)} />
              <label htmlFor="nombre" className="form-label">Nombre</label>
              {errors?.nombre && errors.nombre?.map((error, index) => <small key={index} className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <input type="email" name="correo" id="correo" placeholder=" " required className='form-input' value={client.correo} onChange={e => onChange(e)} />
              <label htmlFor="correo" className="form-label">Correo</label>
              {errors?.correo && errors.correo?.map((error, index) => <small key={index} className="error-msg">{error}</small>)}
            </div>
            <div className="input-container">
              <input type="tel" name="telefono" id="telefono" placeholder=" " required className='form-input' value={client.telefono} onChange={e => onChange(e)} />
              <label htmlFor="telefono" className="form-label">Telefono</label>
              {errors?.telefono && errors.telefono?.map((error, index) => <small key={index} className="error-msg">{error}</small>)}
            </div>
            <div className="buttons__form__container">
              <button className='cancel' onClick={e => { e.preventDefault(); setClientToEdit(null); setClient(INITIAL_CLIENT); cleanErrors(); setOpenForm(false); }}>Cancelar</button>
              {clientToEdit && <button className='delete' onClick={async e => { e.preventDefault(); await deleteClient(clientToEdit); setClient(INITIAL_CLIENT); }}>Eliminar</button>}
              <button className='add' type="submit">{clientToEdit ? "Actualizar" : "Guardar"}</button>
            </div>
          </form>
        </div>
      </div>

    </section>
  )
}

export default ClientForm