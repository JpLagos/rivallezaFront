import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                {isLoggedIn ? (
                    <>
                        <ContactList />
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </header>
        </div>
    );
}

export default App;
