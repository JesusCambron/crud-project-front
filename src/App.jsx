import { useEffect } from "react"
import { ClientProvider } from "./context/ClientContext"
import ClientForm from "./pages/ClientForm"
import ClientList from "./pages/ClientList"


function App() {
  return (
    <div className="App">
      <section className="clients section">
        <div className="clients__container">
          <div className="container__title">
            <h1>CRUD Clients Project</h1>
          </div>
          <ClientProvider>
            <ClientList />
            <ClientForm />
          </ClientProvider>
        </div>
      </section>
    </div >
  )
}

export default App
