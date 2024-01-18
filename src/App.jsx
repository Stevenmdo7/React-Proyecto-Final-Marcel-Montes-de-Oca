import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import Categorias from "./components/categorias";
import Checkout from "./components/Checkout";
import { CarritoProvider } from "./components/context/CarritoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <CarritoProvider>
        <div className="text-center">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />
              }
            />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:categoria" element={<Categorias />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={2500} />
        </div>
      </CarritoProvider>
    </Router>
  );
}

export default App;
