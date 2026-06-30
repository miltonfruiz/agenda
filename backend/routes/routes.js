const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const secretKey = 'mi-llave-secreta';

let contactos = [
  { id: 1, nombre: 'Juan', telefono: '123456789' },
  { id: 2, nombre: 'Maria', telefono: '987654321' }
];

function authenticate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado. No hay token proporcionado.');
  try {
    const decoded = jwt.verify(token, secretKey);
    req.usuario = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Token invalido.');
  }
}

app.post('/login', (req, res) => {
  const usuario = { id: 1, nombre: 'admin' };
  const token = jwt.sign(usuario, secretKey);
  res.send(token);
});

app.get('/contactos', authenticate, (req, res) => {
  res.send(contactos);
});

app.get('/contactos/:id', authenticate, (req, res) => {
  const contacto = contactos.find(c => c.id === parseInt(req.params.id));
  if (!contacto) return res.status(404).send('Contacto no encontrado');
  res.send(contacto);
});

app.post('/contactos', authenticate, (req, res) => {
  const contacto = {
    id: contactos.length + 1,
    nombre: req.body.nombre,
    telefono: req.body.telefono
  };
  contactos.push(contacto);
  res.send(contacto);
});

app.put('/contactos/:id', authenticate, (req, res) => {
  const contacto = contactos.find(c => c.id === parseInt(req.params.id));
  if (!contacto) return res.status(404).send('Contacto no encontrado');
  contacto.nombre = req.body.nombre;
  contacto.telefono = req.body.telefono;
  res.send(contacto);
});

app.delete('/contactos/:id', authenticate, (req, res) => {
  const contacto = contactos.find(c => c.id === parseInt(req.params.id));
  if (!contacto) return res.status(404).send('Contacto no encontrado');
  const index = contactos.indexOf(contacto);
  contactos.splice(index, 1);
  res.send(contacto);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));