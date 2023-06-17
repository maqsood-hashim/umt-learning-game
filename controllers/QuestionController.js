const Question = require('../model/QuestionModel');

module.exports.addQuestion =   async (req, res) =>{
  try {
    const { question, options, category, level,answer } = req.body;

    const newQuestion = new Question({
      question,
      options,
      category,
      level,
      answer
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add question' });
  }
}
 module.exports.getAllQuestions  = async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the questions.' });
    }
  }
  
  module.exports.updateQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const { question, options, category, level, answer } = req.body;
  
      // Find the question by its ID
      const existingQuestion = await Question.findById(questionId);
  
      // Check if the question exists
      if (!existingQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      // Update the question fields
      existingQuestion.question = question;
      existingQuestion.options = options;
      existingQuestion.category = category;
      existingQuestion.level = level;
      existingQuestion.answer = answer;
  
      // Save the updated question
      const updatedQuestion = await existingQuestion.save();
  
      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update question' });
    }
  };
  
 
  module.exports.getSelectedQuestions = async (req, res) => {
    const { category, level } = req.query;
  
    try {
      // Filter questions based on category and level
      let query = {};
      if (category) {
        query.category = category;
      }
      if (level) {
        query.level = level;
      }
  
      const questions = await Question.find(query);
  
      // Shuffle the questions array randomly
      const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  
      // Get the first 10 questions from the shuffled array
      const randomQuestions = shuffledQuestions.slice(0, 10);
  
      res.status(200).json(randomQuestions);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the questions.' });
    }
  };
  module.exports.addManyQuestion = async (req, res) => {
    try {
      const { questions } = req.body;
  
      const savedQuestions = await Question.insertMany(questions);
  
      res.status(201).json(savedQuestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add questions' });
    }
  };
  