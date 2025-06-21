import Navbar from "../components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Clientes from "../pages/Clientes/Clientes";
import Pets from "../pages/Pets/Pets";
import Atendimentos from "../pages/Atendimentos/Atendimentos";
import Servicos from "../pages/Servicos/Servicos";
import Caixa from "../pages/Caixa/Caixa";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/atendimentos" element={<Atendimentos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/caixa" element={<Caixa />} />
      </Routes>
    </Router>
  );
}

export default App;
