const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.log('Error fetching contacts:', err);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    console.log('Error creating contact:', err);
    res.status(500).json({ message: 'Error creating contact' });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(contact);
  } catch (err) {
    console.log('Error updating contact:', err);
    res.status(500).json({ message: 'Error updating contact' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    console.log('Error deleting contact:', err);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});