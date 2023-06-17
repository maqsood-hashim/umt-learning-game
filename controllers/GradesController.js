const Grade = require('../model/GradesModel');

// Controller function to add or update grade data
const addOrUpdateGrade = async (req, res) => {
    try {
      const { student_id, level, week, value } = req.body;
  
      // Check if the grade already exists
      let grade = await Grade.findOne({ student_id, level });
  
      if (!grade) {
        // Create a new grade if it doesn't exist
        grade = new Grade({
          student_id,
          level,
          [week]: value,
        });
      } else {
        // Update the week field if the grade already exists
        grade[week] = value;
      }
  
      // Save the grade
      await grade.save();
  
      res.status(200).json({ message: 'Grade added/updated successfully' });
    } catch (error) {
      console.error('Error in addOrUpdateGrade:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


const getAllGrades = async (req, res) => {
    try {
      const grades = await Grade.find();
      res.status(200).json(grades);
    } catch (error) {
      console.error('Error in fetching grades:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const getStudentGrades = async (req, res) => {
    try {
      const { student_id } = req.params;
      const grades = await Grade.find({ student_id: { $eq: student_id } });
      res.status(200).json(grades);
    } catch (error) {
      console.error('Error in fetching grades:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
module.exports = {
    getAllGrades,
  addOrUpdateGrade,
  getStudentGrades
};
