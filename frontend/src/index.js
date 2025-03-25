import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Selecciona el contenedor raíz
const container = document.getElementById('root');
const root = createRoot(container); // Crea una raíz

// Renderiza la aplicación
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);