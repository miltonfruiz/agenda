class Contacto {
  constructor(id, nombre, apellido, telefono, correo) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.correo = correo;
  }
}

class Agenda {
  constructor() {
    this.contactos = [];
  }

  crearContacto(contacto) {
    this.contactos.push(contacto);
  }

  leerContactos() {
    return this.contactos;
  }

  actualizarContacto(id, contactoActualizado) {
    const indice = this.contactos.findIndex(contacto => contacto.id === id);
    if (indice !== -1) {
      this.contactos[indice] = contactoActualizado;
    }
  }

  eliminarContacto(id) {
    this.contactos = this.contactos.filter(contacto => contacto.id !== id);
  }
}

class ControladorAgenda {
  constructor() {
    this.agenda = new Agenda();
  }

  crearContacto(nombre, apellido, telefono, correo) {
    const id = this.agenda.leerContactos().length + 1;
    const contacto = new Contacto(id, nombre, apellido, telefono, correo);
    this.agenda.crearContacto(contacto);
  }

  leerContactos() {
    return this.agenda.leerContactos();
  }

  actualizarContacto(id, nombre, apellido, telefono, correo) {
    const contactoActualizado = new Contacto(id, nombre, apellido, telefono, correo);
    this.agenda.actualizarContacto(id, contactoActualizado);
  }

  eliminarContacto(id) {
    this.agenda.eliminarContacto(id);
  }
}

const controlador = new ControladorAgenda();

controlador.crearContacto('Juan', 'Pérez', '1234567890', 'juan@example.com');
controlador.crearContacto('María', 'Gómez', '9876543210', 'maria@example.com');

console.log(controlador.leerContactos());

controlador.actualizarContacto(1, 'Juan', 'Pérez', '1234567890', 'juan@example.net');

console.log(controlador.leerContactos());

controlador.eliminarContacto(2);

console.log(controlador.leerContactos());