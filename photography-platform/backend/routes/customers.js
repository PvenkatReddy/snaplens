const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Photographer = require('../models/Photographer');

// Register a new photographer
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let photographer = await Photographer.findOne({ email });
    if (photographer) {
      return res.status(400).json({ msg: 'Photographer already exists' });
    }

    photographer = new Photographer({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    photographer.password = await bcrypt.hash(password, salt);

    await photographer.save();

    const payload = {
      user: {
        id: photographer.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login photographer
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let photographer = await Photographer.findOne({ email });
    if (!photographer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, photographer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: photographer.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
