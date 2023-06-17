const express = require('express');
const { adminAuthentication } = require("../middlewares/authentication");
const router = express.Router();
const questionController = require('../controllers/QuestionController');

router.post('/add-questions', questionController.addQuestion);
router.post('/add-many-questions', questionController.addManyQuestion);

router.get('/get-questions', questionController.getAllQuestions);
router.put('/update-questions/:questionId', questionController.updateQuestion);
router.get('/get-random-questions', questionController.getSelectedQuestions);
module.exports = router;
