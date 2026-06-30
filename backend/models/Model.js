const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  direccion: { type: String }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;