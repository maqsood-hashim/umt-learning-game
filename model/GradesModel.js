const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  
  student_id: { type: String, required: true },
  level: { type: String, required: true },
  week1: { type: Number },
  week2: { type: Number },
  week3: { type: Number },
  week4: { type: Number },
  week5: { type: Number },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
