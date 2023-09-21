import React from 'react';
import './App.css'; // Importa los estilos de tu aplicación

import ContactList from './components/ContactList'; // Importa el componente ContactList

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Renderiza el componente ContactList */}
                <ContactList />
            </header>
        </div>
    );
}

export default App;
