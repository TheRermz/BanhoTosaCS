import { useEffect, useState } from "react";
import "./Atendimentos.css";

const statusLabels = ["Pendente", "Concluído", "Cancelado"];

function getLocalDate() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // yyyy-mm-dd
}

function getLocalTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // HH:MM
}

function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [pets, setPets] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    observacao: "",
    petID: "",
    servicoID: "",
    status: 0,
  });
  const [editingId, setEditingId] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API;

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [atRes, petsRes, servRes] = await Promise.all([
        fetch(`${apiURL}/atendimentos`),
        fetch(`${apiURL}/pet`),
        fetch(`${apiURL}/servicos`),
      ]);
      const [atData, petsData, servData] = await Promise.all([
        atRes.json(),
        petsRes.json(),
        servRes.json(),
      ]);
      setAtendimentos(atData);
      setPets(petsData);
      setServicos(servData);
    } catch {
      setAtendimentos([]);
      setPets([]);
      setServicos([]);
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setFormData({
      data: getLocalDate(),
      hora: getLocalTime(),
      observacao: "",
      petID: "",
      servicoID: "",
      status: 0,
    });
    setEditingId(null);
    setShowForm(true);
  }

  function handleEdit(atendimento) {
    if (atendimento.status === 1) return;
    setFormData({
      data: atendimento.data,
      hora: atendimento.hora ? atendimento.hora.slice(0, 5) : "",
      observacao: atendimento.observacao || "",
      petID: atendimento.petID,
      servicoID: atendimento.servicoID,
      status: atendimento.status,
    });
    setEditingId(atendimento.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      data: formData.data,
      hora: formData.hora,
      observacao: formData.observacao,
      status: Number(formData.status),
      petID: Number(formData.petID),
      servicoID: Number(formData.servicoID),
    };

    if (editingId) {
      await fetch(`${apiURL}/atendimentos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, id: editingId }),
      });
    } else {
      await fetch(`${apiURL}/atendimentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    fetchAll();
  }

  function getPetNome(id) {
    const pet = pets.find((p) => p.id === id);
    return pet ? pet.nome : "Desconhecido";
  }

  function getServicoNome(id) {
    const servico = servicos.find((s) => s.id === id);
    return servico ? servico.tipo : "Desconhecido";
  }

  function getStatusLabel(status) {
    return statusLabels[status] || "Desconhecido";
  }

  return (
    <main className="atendimentos-container">
      <h1>Atendimentos</h1>
      <button className="novo-btn" onClick={handleCreate}>
        Novo Atendimento
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="atendimentos-lista">
          {atendimentos.map((a) => (
            <li key={a.id} className="atendimento-card">
              <div>
                <strong>{getPetNome(a.petID)}</strong>
                <div>Serviço: {getServicoNome(a.servicoID)}</div>
                <div>Data: {a.data}</div>
                <div>Hora: {a.hora ? a.hora.slice(0, 5) : ""}</div>
                <div>Status: {getStatusLabel(a.status)}</div>
                {a.observacao && <div>Obs: {a.observacao}</div>}
              </div>
              <div className="card-actions">
                <button
                  onClick={() => handleEdit(a)}
                  disabled={a.status === 1}
                  style={
                    a.status === 1
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="modal-bg" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar Atendimento" : "Novo Atendimento"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Data:
                <input
                  type="date"
                  value={formData.data}
                  readOnly={editingId === null}
                  onChange={
                    editingId !== null
                      ? (e) =>
                          setFormData({ ...formData, data: e.target.value })
                      : undefined
                  }
                  required
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  value={formData.hora}
                  readOnly={editingId === null}
                  onChange={
                    editingId !== null
                      ? (e) =>
                          setFormData({ ...formData, hora: e.target.value })
                      : undefined
                  }
                  required
                />
              </label>
              <label>
                Observação:
                <input
                  type="text"
                  value={formData.observacao}
                  onChange={(e) =>
                    setFormData({ ...formData, observacao: e.target.value })
                  }
                  placeholder="Opcional"
                />
              </label>
              <label>
                Pet:
                <select
                  value={formData.petID}
                  onChange={(e) =>
                    setFormData({ ...formData, petID: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Serviço:
                <select
                  value={formData.servicoID}
                  onChange={(e) =>
                    setFormData({ ...formData, servicoID: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {servicos.map((servico) => (
                    <option key={servico.id} value={servico.id}>
                      {servico.tipo}
                    </option>
                  ))}
                </select>
              </label>
              {editingId !== null && (
                <label>
                  Status:
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: Number(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Pendente</option>
                    <option value={1}>Concluído</option>
                    <option value={2}>Cancelado</option>
                  </select>
                </label>
              )}
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

export default Atendimentos;
