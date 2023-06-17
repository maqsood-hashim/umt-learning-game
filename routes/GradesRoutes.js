const express = require('express');
const router = express.Router();
const { getAllGrades } = require('../controllers/GradesController');
const { addOrUpdateGrade } = require('../controllers/GradesController');
const { getStudentGrades } = require('../controllers/GradesController');
// Define the route
router.post('/addUpdateGrades', addOrUpdateGrade);


// Route to fetch all grades
router.get('/getAllGrades', getAllGrades);
router.get('/getStudentGrades/:student_id',getStudentGrades  );
module.exports = router;
