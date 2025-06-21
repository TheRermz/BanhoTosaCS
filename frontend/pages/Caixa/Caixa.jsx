import { useEffect, useState } from "react";
import "./Caixa.css";

function getLocalDateTime() {
  const now = new Date();
  // yyyy-MM-ddTHH:mm (para input type="datetime-local")
  return now.toISOString().slice(0, 16);
}

function formatDateTime(dt) {
  if (!dt) return "";
  const date = new Date(dt);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const tipoLabels = ["Entrada", "Saída"];

function Caixa() {
  const [total, setTotal] = useState(0);
  const [totalMes, setTotalMes] = useState(0);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 0,
    valor: "",
    dataHora: "",
    descricao: "",
  });
  const [editingId, setEditingId] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API;

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [totalRes, mesRes, movRes] = await Promise.all([
        fetch(`${apiURL}/caixa/total`),
        fetch(`${apiURL}/caixa/mes-atual`),
        fetch(`${apiURL}/caixa`),
      ]);
      const [totalData, mesData, movData] = await Promise.all([
        totalRes.json(),
        mesRes.json(),
        movRes.json(),
      ]);
      setTotal(totalData);
      setTotalMes(mesData);
      setMovimentacoes(
        movData.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
      );
    } catch {
      setTotal(0);
      setTotalMes(0);
      setMovimentacoes([]);
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setFormData({
      tipo: 0,
      valor: "",
      dataHora: getLocalDateTime(),
      descricao: "",
    });
    setEditingId(null);
    setShowForm(true);
  }

  function handleEdit(mov) {
    setFormData({
      tipo: mov.tipo,
      valor: mov.valor,
      dataHora: mov.dataHora.slice(0, 16),
      descricao: mov.descricao || "",
    });
    setEditingId(mov.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (Number(formData.valor) < 0) {
      alert("O valor não pode ser negativo.");
      return;
    }
    const payload = {
      tipo: Number(formData.tipo),
      valor: Math.abs(Number(formData.valor)),
      dataHora: formData.dataHora,
      descricao: formData.descricao,
    };
    if (editingId) {
      await fetch(`${apiURL}/caixa/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editingId }),
      });
    } else {
      await fetch(`${apiURL}/caixa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    fetchAll();
  }

  return (
    <main className="caixa-container">
      <h1>Caixa</h1>
      <div className="caixa-cards">
        <div className="caixa-card">
          <h2>Total Geral</h2>
          <span className="caixa-value">{formatCurrency(total)}</span>
        </div>
        <div className="caixa-card">
          <h2>Total do Mês</h2>
          <span className="caixa-value">{formatCurrency(totalMes)}</span>
        </div>
      </div>
      <button className="novo-btn" onClick={handleCreate}>
        Nova Movimentação
      </button>
      {showForm && (
        <div className="modal-bg" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar Movimentação" : "Nova Movimentação"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Tipo:
                <select
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: Number(e.target.value) })
                  }
                  required
                >
                  <option value={0}>Entrada</option>
                  <option value={1}>Saída</option>
                </select>
              </label>
              <label>
                Valor:
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Data e Hora:
                <input
                  type="datetime-local"
                  value={formData.dataHora}
                  onChange={(e) =>
                    setFormData({ ...formData, dataHora: e.target.value })
                  }
                  required
                  readOnly={editingId === null}
                />
              </label>
              <label>
                Descrição:
                <input
                  type="text"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  placeholder="Opcional"
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
      <div className="caixa-table-responsive">
        <table className="caixa-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data e Hora</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Carregando...</td>
              </tr>
            ) : movimentacoes.length === 0 ? (
              <tr>
                <td colSpan={5}>Nenhuma movimentação encontrada.</td>
              </tr>
            ) : (
              movimentacoes.map((mov) => (
                <tr key={mov.id}>
                  <td data-label="Tipo">{tipoLabels[mov.tipo]}</td>
                  <td data-label="Valor">{formatCurrency(mov.valor)}</td>
                  <td data-label="Data e Hora">
                    {formatDateTime(mov.dataHora)}
                  </td>
                  <td data-label="Descrição">{mov.descricao}</td>
                  <td data-label="Ações">
                    <button onClick={() => handleEdit(mov)}>Editar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Caixa;
