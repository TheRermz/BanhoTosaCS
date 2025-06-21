import { useEffect, useState } from "react";
import "./Clientes.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", telefone: "" });
  const [editingId, setEditingId] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API; // variável do .env

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/api/clientes`);
      const data = await res.json();
      setClientes(data);
    } catch {
      setClientes([]);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(cliente) {
    setFormData({ nome: cliente.nome, telefone: cliente.telefone });
    setEditingId(cliente.id);
    setShowForm(true);
  }

  function handleDelete(cliente) {
    if (Array.isArray(cliente.pets) && cliente.pets.length > 0) {
      alert("Não é possível excluir um cliente que possui pets cadastrados.");
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      fetch(`${apiURL}/api/clientes/${cliente.id}`, {
        method: "DELETE",
      }).then(() => fetchClientes());
    }
  }

  function handleCreate() {
    setFormData({ nome: "", telefone: "" });
    setEditingId(null);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      await fetch(`${apiURL}/api/clientes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(`${apiURL}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: editingId }),
      });
    }
    setShowForm(false);
    fetchClientes();
  }

  return (
    <main className="clientes-container">
      <h1>Clientes</h1>
      <button className="novo-btn" onClick={handleCreate}>
        Novo Cliente
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="clientes-lista">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="cliente-card">
              <div>
                <strong>{cliente.nome}</strong>
                <div>Telefone: {cliente.telefone}</div>
                <div>
                  Pets:
                  <ul>
                    {cliente.pets && cliente.pets.length > 0 ? (
                      cliente.pets.map((pet) => (
                        <li key={pet.id}>{pet.nome}</li>
                      ))
                    ) : (
                      <li>Nenhum pet cadastrado</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="modal-bg" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar Cliente" : "Novo Cliente"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Clientes;
