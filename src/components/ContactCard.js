import React from 'react';
import '../styles/styles.css';

function ContactCard({ contact, onMarkAttendance, onDeleteContact }) {
    return (
        <div className="contact-card">
            <h2>{contact.nombre}</h2>
            <p>RUT: {contact.rut}</p>
            <p>Número: {contact.numero}</p>
            <p>Número de Asistencias: {contact.asistencias}</p>

            <button className="contact-buttom" onClick={() => onMarkAttendance(contact.rut)}>Agregar Asistencia</button>
            <button className="contact-buttom" onClick={() => onDeleteContact(contact.rut)}>Eliminar</button>
        </div>
    );
}

export default ContactCard;
