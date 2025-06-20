import Navbar from "../components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import Clientes from "./pages/Clientes";
// import Pets from "./pages/Pets";
// import Atendimentos from "./pages/Atendimentos";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/clientes" element={<Clientes />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/atendimentos" element={<Atendimentos />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
