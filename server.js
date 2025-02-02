const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/attendanceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Student Schema
const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  club: String
});
const Student = mongoose.model('Student', studentSchema);

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  date: String,
  records: [
    {
      id: Number,
      name: String,
      club: String,
      status: String
    }
  ]
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Fetch students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Save attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { date, records } = req.body;

    const attendance = new Attendance({
      date,
      records
    });

    await attendance.save();
    res.json({ message: 'Attendance saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving attendance' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
