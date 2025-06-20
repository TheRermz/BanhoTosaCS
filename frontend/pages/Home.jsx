import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [clientes, setClientes] = useState(null);
  const [pets, setPets] = useState(null);
  const [caixa, setCaixa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientesRes, petsRes, caixaRes] = await Promise.all([
          fetch("http://192.168.15.5:5029/api/clientes/total"),
          fetch("http://192.168.15.5:5029/api/pet/total"),
          fetch("http://192.168.15.5:5029/api/caixa/total"),
        ]);
        const clientesData = await clientesRes.json();
        const petsData = await petsRes.json();
        const caixaData = await caixaRes.json();

        setClientes(clientesData);
        setPets(petsData);
        setCaixa(caixaData);
      } catch (err) {
        setClientes("-");
        setPets("-");
        setCaixa("-");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
    </main>
  );
}

export default Home;
