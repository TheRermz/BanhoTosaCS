import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [clientes, setClientes] = useState(null);
  const [pets, setPets] = useState(null);
  const [petLista, setPetLista] = useState([]);
  const [caixa, setCaixa] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAtend, setLoadingAtend] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientesRes, petsRes, caixaRes, servicosRes, petListaRes] =
          await Promise.all([
            fetch("http://192.168.15.5:5029/api/clientes/total"),
            fetch("http://192.168.15.5:5029/api/pet/total"),
            fetch("http://192.168.15.5:5029/api/caixa/total"),
            fetch("http://192.168.15.5:5029/api/servicos"),
            fetch("http://192.168.15.5:5029/api/pet"),
          ]);
        const clientesData = await clientesRes.json();
        const petsData = await petsRes.json();
        const caixaData = await caixaRes.json();
        const servicosData = await servicosRes.json();
        const petsListaData = await petListaRes.json();

        setClientes(clientesData);
        setPets(petsData);
        setCaixa(caixaData);
        setServicos(servicosData);
        setPetLista(petsListaData);
      } catch (err) {
        setClientes("-");
        setPets("-");
        setCaixa("-");
        setServicos([]);
        setPetLista([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const res = await fetch("http://192.168.15.5:5029/api/atendimentos/");
        if (!res.ok) throw new Error();
        const data = await res.json();

        const atendimentosFormatados = data.map((atendimento) => {
          const dataFormatada = new Date(atendimento.data).toLocaleDateString(
            "pt-BR",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          );

          const fullDateTime = `1970-01-01T${atendimento.hora}`;
          const horaObj = new Date(fullDateTime);
          horaObj.setHours(horaObj.getHours() - 3);

          const horaFormatada = !isNaN(horaObj)
            ? horaObj.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Hora inválida";

          const pet = petLista.find((p) => p.id === atendimento.petID);
          const servico = servicos.find((s) => s.id === atendimento.servicoID);

          const valorServico = servico ? servico.preco : 0;

          return {
            ...atendimento,
            data: dataFormatada,
            hora: horaFormatada,
            petNome: pet ? pet.nome : "Pet desconhecido",
            servicoNome: servico ? servico.tipo : "Serviço desconhecido",
            valor: valorServico.toFixed(2),
          };
        });

        const atendimentosOrdenados = [...atendimentosFormatados].sort(
          (a, b) => b.id - a.id
        );

        setAtendimentos(atendimentosOrdenados);
      } catch {
        setAtendimentos([]);
      } finally {
        setLoadingAtend(false);
      }
    }

    fetchAtendimentos();
  }, [pets, servicos, petLista]);

  return (
    <main className="home-container">
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h2>Total de Clientes</h2>
          <span className="card-value">
            {loading ? "Carregando..." : clientes}
          </span>
        </div>
        <div className="card">
          <h2>Total de Pets</h2>
          <span className="card-value">{loading ? "Carregando..." : pets}</span>
        </div>
        <div className="card">
          <h2>Total do Caixa</h2>
          <span className="card-value">
            {loading ? "Carregando..." : `R$ ${caixa}`}
          </span>
        </div>
      </div>
      <section className="atendimentos-section">
        <h2>Últimos Atendimentos</h2>
        <div className="table-responsive">
          <table className="atendimentos-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Pet</th>
                <th>Serviço</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {loadingAtend ? (
                <tr>
                  <td colSpan={5}>Carregando...</td>
                </tr>
              ) : atendimentos.length === 0 ? (
                <tr>
                  <td colSpan={5}>Nenhum atendimento encontrado.</td>
                </tr>
              ) : (
                atendimentos.slice(0, 5).map((a) => (
                  <tr key={a.id}>
                    <td data-label="Data">{a.data}</td>
                    <td data-label="Hora">{a.hora}</td>
                    <td data-label="PetNome">{a.petNome}</td>
                    <td data-label="ServicoNome">{a.servicoNome}</td>
                    <td data-label="Valor">R$ {a.valor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Home;
