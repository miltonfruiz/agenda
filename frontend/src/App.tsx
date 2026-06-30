import React, { useState, useEffect } from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then(response => response.json())
      .then(data => setContacts(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    })
      .then(response => response.json())
      .then(data => setContacts([...contacts, data]));
    setName('');
    setPhone('');
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' })
      .then(() => setContacts(contacts.filter(contact => contact.id !== id)));
  };

  return (
    <div>
      <h1>Agenda de Contactos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label>
          Teléfono:
          <input type="text" value={phone} onChange={event => setPhone(event.target.value)} />
        </label>
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button type="button" onClick={() => handleDelete(contact.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;