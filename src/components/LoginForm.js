// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realizar la llamada al servidor para iniciar sesión
        const response = await fetch('http://localhost:3000/api/inicio-sesion', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Si la respuesta es exitosa, realiza acciones necesarias
            alert("autenticacion exitosa!")
            onLogin();
        } else {
            // Si hay un error, puedes mostrar un mensaje al usuario
            console.error('Error al iniciar sesión');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
