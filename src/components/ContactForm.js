import React from 'react';

function ContactForm({ newContact, onInputChange, onAddContact }) {
    return (
        <div className="contact-form">
            <h2>Agregar Nuevo Contacto</h2>
            <input
                type="text"
                name="rut"
                placeholder="RUT"
                value={newContact.rut}
                onChange={onInputChange}
            />
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={newContact.nombre}
                onChange={onInputChange}
            />
            <input
                type="text"
                name="numero"
                placeholder="Número"
                value={newContact.numero}
                onChange={onInputChange}
            />
            <label>
                Asistencia:
                <input
                    type="checkbox"
                    name="asistencia"
                    checked={newContact.asistencia}
                    onChange={() =>
                        onInputChange({
                            target: {
                                name: 'asistencia',
                                value: !newContact.asistencia,
                            },
                        })
                    }
                />
            </label>
            <button onClick={onAddContact}>Agregar Contacto</button>
        </div>
    );
}

export default ContactForm;
