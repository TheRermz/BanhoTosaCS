import { useEffect, useState } from "react";
import "./Pets.css";

function Pets() {
  const [pets, setPets] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    raca: "",
    clienteId: "",
  });
  const [editingId, setEditingId] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API; // Ajuste para sua variável de ambiente

  useEffect(() => {
    fetchPets();
    fetchClientes();
  }, []);

  async function fetchPets() {
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/pet`);
      const data = await res.json();
      setPets(data);
    } catch {
      setPets([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchClientes() {
    try {
      const res = await fetch(`${apiURL}/clientes`);
      const data = await res.json();
      setClientes(data);
    } catch {
      setClientes([]);
    }
  }

  function handleEdit(pet) {
    setFormData({
      nome: pet.nome,
      raca: pet.raca || "",
      clienteId: pet.clienteID || "",
    });
    setEditingId(pet.id);
    setShowForm(true);
  }

  async function handleDelete(pet) {
    // Busca atendimentos do pet antes de excluir
    try {
      const res = await fetch(`${apiURL}/atendimentos?petID=${pet.id}`);
      const atendimentos = await res.json();
      if (Array.isArray(atendimentos) && atendimentos.length > 0) {
        alert(
          "Não é possível excluir um pet que possui atendimentos cadastrados."
        );
        return;
      }
    } catch {
      alert("Erro ao verificar atendimentos do pet.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este pet?")) {
      await fetch(`${apiURL}/pet/${pet.id}`, {
        method: "DELETE",
      });
      fetchPets();
    }
  }

  function handleCreate() {
    setFormData({ nome: "", raca: "", clienteId: "" });
    setEditingId(null);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nome: formData.nome,
      raca: formData.raca,
      clienteID: formData.clienteId,
    };
    if (editingId) {
      await fetch(`${apiURL}/pet/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${apiURL}/pet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    fetchPets();
  }

  function getClienteNome(clienteId) {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : "Desconhecido";
  }

  return (
    <main className="pets-container">
      <h1>Pets</h1>
      <button className="novo-btn" onClick={handleCreate}>
        Novo Pet
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="pets-lista">
          {pets.map((pet) => (
            <li key={pet.id} className="pet-card">
              <div>
                <strong>{pet.nome}</strong>
                <div>Raça: {pet.raca || "Não informada"}</div>
                <div>Dono: {getClienteNome(pet.clienteID)}</div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(pet)}>Editar</button>
                <button onClick={() => handleDelete(pet)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="modal-bg" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar Pet" : "Novo Pet"}</h2>
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
                Raça:
                <input
                  type="text"
                  value={formData.raca}
                  onChange={(e) =>
                    setFormData({ ...formData, raca: e.target.value })
                  }
                  placeholder="Opcional"
                />
              </label>
              <label>
                Cliente:
                <select
                  value={formData.clienteId}
                  onChange={(e) =>
                    setFormData({ ...formData, clienteId: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
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

export default Pets;
