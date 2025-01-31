const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // To allow cross-origin requests from the frontend
app.use(bodyParser.json()); // For parsing application/json

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/attendance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  club: String,
  status: { type: String, enum: ['present', 'absent'] }
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// Get all students (attendance data)
app.get('/api/attendance', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Update student attendance
app.put('/api/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(id, { status }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Attendance updated', student });
  } catch (err) {
    res.status(500).json({ message: 'Error updating attendance' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
