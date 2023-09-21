import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa los estilos globales de tu aplicación
import App from './App'; // Importa el componente principal de la aplicación


ReactDOM.render(
    <React.StrictMode>
        {/* Renderiza el componente App en el elemento con el id "root" del documento HTML */}
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
