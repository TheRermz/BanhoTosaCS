import { useEffect, useState } from "react";
import "./Servicos.css";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ tipo: "", preco: "" });
  const [editingId, setEditingId] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API;

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [servRes, atendRes] = await Promise.all([
        fetch(`${apiURL}/servicos`),
        fetch(`${apiURL}/atendimentos`),
      ]);
      const [servData, atendData] = await Promise.all([
        servRes.json(),
        atendRes.json(),
      ]);
      setServicos(servData);
      setAtendimentos(atendData);
    } catch {
      setServicos([]);
      setAtendimentos([]);
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setFormData({ tipo: "", preco: "" });
    setEditingId(null);
    setShowForm(true);
  }

  function handleEdit(servico) {
    setFormData({ tipo: servico.tipo, preco: servico.preco });
    setEditingId(servico.id);
    setShowForm(true);
  }

  async function handleDelete(servico) {
    const emUso = atendimentos.some((a) => a.servicoID === servico.id);
    if (emUso) {
      alert(
        "Não é possível excluir um serviço que está em uso em atendimentos."
      );
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      await fetch(`${apiURL}/servicos/${servico.id}`, {
        method: "DELETE",
      });
      fetchAll();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      tipo: formData.tipo,
      preco: Number(formData.preco),
    };
    if (editingId) {
      await fetch(`${apiURL}/servicos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${apiURL}/servicos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    fetchAll();
  }

  return (
    <main className="servicos-container">
      <h1>Serviços</h1>
      <button className="novo-btn" onClick={handleCreate}>
        Novo Serviço
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="servicos-lista">
          {servicos.map((servico) => (
            <li key={servico.id} className="servico-card">
              <div>
                <strong>{servico.tipo}</strong>
                <div>Preço: R$ {Number(servico.preco).toFixed(2)}</div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(servico)}>Editar</button>
                <button onClick={() => handleDelete(servico)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="modal-bg" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar Serviço" : "Novo Serviço"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Tipo:
                <input
                  type="text"
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Preço:
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) =>
                    setFormData({ ...formData, preco: e.target.value })
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

export default Servicos;
