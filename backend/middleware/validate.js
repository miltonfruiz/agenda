const { check, body, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio y debe ser válido').isEmail(),
        check('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').isLength({ min: 8 }),
      ];
    }
    case 'login': {
      return [
        check('email', 'El email es obligatorio y debe ser válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
      ];
    }
    default:
      return [];
  }
};

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate, validateResult };