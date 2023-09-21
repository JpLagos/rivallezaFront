import React from 'react';

function ContactCard({ contact, onMarkAttendance, onDeleteContact }) {
    return (
        <div className="contact-card">
            <h2>{contact.nombre}</h2>
            <p>RUT: {contact.rut}</p>
            <p>Número: {contact.numero}</p>
            <label>
                Asistencia:
                <input
                    type="checkbox"
                    checked={contact.asistencia}
                    onChange={() => onMarkAttendance(contact.id)}
                />
            </label>
            <button onClick={() => onDeleteContact(contact.rut)}>Eliminar</button>
        </div>
    );
}

export default ContactCard;
