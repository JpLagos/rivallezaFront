import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import '../styles/styles.css';

const serverUrl = 'http://localhost:3000';
function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        rut: '',
        nombre: '',
        numero: '',
        asistencias: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lógica para obtener la lista de contactos desde la API al cargar el componente
        fetch(`${serverUrl}/api/contacts`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setContacts(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false); // En caso de error, también indicamos que se ha cargado
            });
    }, []);

    const handleMarkAttendance = (rut) => {
        // Lógica para agregar una entrada al contacto mediante una solicitud PUT
        fetch(`${serverUrl}/api/contacts/${rut}/update-asistencias`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevaAsistencias: 1 }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("datos", data); // Verifica que la respuesta contenga el número de asistencias actualizado

                // Actualiza el estado utilizando una función de actualización
                setContacts((prevContacts) => {
                    return prevContacts.map((contact) => {
                        if (contact.rut === rut) {
                            // Actualiza el campo de asistencias del contacto correspondiente
                            return { ...contact, asistencias: data.asistencias };
                        }
                        return contact;
                    });
                });
            })
            .catch((error) => console.error('Error:', error));
    };
    const handleDeleteContact = (rut) => {
        // Lógica para eliminar un contacto mediante una solicitud DELETE
        if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
            fetch(`${serverUrl}/api/contacts/${rut}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const updatedContacts = contacts.filter((contact) => contact.rut !== rut);
                    setContacts(updatedContacts);
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewContact({ ...newContact, [name]: value });
    };


    const handleAddContact = () => {
        // Lógica para agregar un nuevo contacto mediante una solicitud POST
        fetch(`${serverUrl}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Inicializa la propiedad asistencias en 0 para el nuevo contacto
                data.asistencias = 0;
                setContacts([...contacts, data]);
                setNewContact({
                    rut: '',
                    nombre: '',
                    numero: '',
                    asistencias: 0, // Inicializar asistencias en 0
                });
            })
            .catch((error) => {
                console.error('Error:', error)
                console.log('Error', error)
                alert(`Error: ${error.message}`)
            })
    };

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <ContactForm
                newContact={newContact}
                onInputChange={handleInputChange}
                onAddContact={handleAddContact}
            />
            {isLoading ? (
                <p>Cargando contactos...</p>
            ) : (
                contacts.map((contact) => (
                    <ContactCard
                        key={contact.id || contact.rut}
                        contact={contact}
                        onMarkAttendance={handleMarkAttendance}
                        onDeleteContact={handleDeleteContact}
                    />
                ))
            )}
        </div>
    );
}

export default ContactList;
