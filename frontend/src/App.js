import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Premium from './components/pages/Premium';
import Login from './components/pages/Login.tsx';
import Galeria from './components/pages/Galeria';
import RecuperarContraseña from './components/pages/RecuperarContraseña.jsx'
import Membresias from './components/pages/Membresias';
import Index from './components/pages/index.tsx';
import Registro from './components/pages/Registro.tsx';
import BarberiasDisponibles from './components/pages/BarberiasDisponibles.tsx';
import Barberosbarbafina from './components/pages/BarberosDisponibles-Barbafina.tsx';
import Barberostucorte from './components/pages/BarberosDisponibles-Tucorte.tsx';
import Barberosbarbershop from './components/pages/BarberosDisponibles-Barbershop.tsx';
import ReservaTurno from './components/pages/ReservaTurno.tsx';
import RegistroCredenciales from './components/pages/Registro-Credenciales.tsx';
import DashboardBarbero from './components/pages/dashboard-barbero.tsx';
import GaleriaSeleccionable from './components/pages/GaleriaSeleccionable.tsx';
import Cuadrada from './components/pages/cuadrada.tsx';
import Ovalada from './components/pages/ovalada.tsx';
import Redonda from './components/pages/circular.tsx';
import Triangular from './components/pages/triangular.tsx';
import MisTurnos from './components/pages/MisTurnos.tsx';
import ParaBarberias from './components/pages/ParaBarberias.tsx';
import GestionBarberos from './components/pages/GestionBarberos.tsx';
import ConfigurarBarberia from './components/pages/ConfigurarBarberia.tsx';
import EstadisticasBarberia from './components/pages/EstadisticasBarberia.tsx';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/para-barberias" element={<ParaBarberias />} />
            <Route path="/gestion-barberos" element={<GestionBarberos />} />
            <Route path="/configurar-barberia" element={<ConfigurarBarberia />} />
            <Route path="/estadisticas-barberia" element={<EstadisticasBarberia />} />
            <Route path="/Premium" element={<Premium />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="RecuperarContraseña" element={<RecuperarContraseña />} />
            <Route path="/membresias" element={<Membresias />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Barberias-Disponibles" element={<BarberiasDisponibles />} />
            <Route path="/Barberos-Disponibles/barbafina" element={<Barberosbarbafina />} />
            <Route path="/Barberos-Disponibles/tucorte" element={<Barberostucorte />} />
            <Route path="/Barberos-Disponibles/barbershop" element={<Barberosbarbershop />} />

            {/* Protected Routes */}
            <Route path="/Reserva-Turno" element={
              <ProtectedRoute>
                <ReservaTurno />
              </ProtectedRoute>
            } />
            <Route path="/Dashboard-Barbero" element={
              <ProtectedRoute>
                <DashboardBarbero />
              </ProtectedRoute>
            } />
            <Route path="/Mis-Turnos" element={
              <ProtectedRoute>
                <MisTurnos />
              </ProtectedRoute>
            } />

            <Route path="/Registro-Credenciales" element={<RegistroCredenciales />} />
            <Route path="/Galeria-Seleccionable" element={<GaleriaSeleccionable />} />
            <Route path="/cortes/cuadrada" element={<Cuadrada />} />
            <Route path="/cortes/ovalada" element={<Ovalada />} />
            <Route path="/cortes/redonda" element={<Redonda />} />
            <Route path="/cortes/triangular" element={<Triangular />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
