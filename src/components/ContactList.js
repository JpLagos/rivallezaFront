import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';

const serverUrl = 'http://localhost:3000';
function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        rut: '',
        nombre: '',
        numero: '',
        asistencia: false,
    });

    useEffect(() => {
        // Lógica para obtener la lista de contactos desde la API al cargar el componente
        fetch(`${serverUrl}/api/contacts`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleMarkAttendance = (id) => {
        // Lógica para marcar la asistencia de un contacto mediante una solicitud PUT
        const updatedContacts = contacts.map((contact) => {
            if (contact.id === id) {
                contact.asistencia = !contact.asistencia;
                fetch(`${serverUrl}/api/contacts/${contact.rut}/update-asistencia`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nuevaAsistencia: contact.asistencia ? 1 : 0 }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.error('Error:', error));
            }
            return contact;
        });
        setContacts(updatedContacts);
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
        fetch(`${serverUrl}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setContacts([...contacts, data]);
                setNewContact({
                    rut: '',
                    nombre: '',
                    numero: '',
                    asistencia: false,
                });
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Lista de Contactos</h1>
            <ContactForm
                newContact={newContact}
                onInputChange={handleInputChange}
                onAddContact={handleAddContact}
            />
            {contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    onMarkAttendance={handleMarkAttendance}
                    onDeleteContact={handleDeleteContact}
                />
            ))}
        </div>
    );
}

export default ContactList;
