const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Modelo de usuario
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar campos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar usuario existente
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token de acceso
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Cerrar sesión
router.post('/logout', (req, res) => {
    try {
        // Invalidar token de acceso
        req.session.destroy();

        res.json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
});

module.exports = router;