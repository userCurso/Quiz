var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load);

router.get('/quizesList', quizController.quizes);

router.get('/quizes', quizController.sQuizes);

router.get('/quizes/new', quizController.newQuiz);

router.post('/quizes/create', quizController.createQuiz);

router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

router.put('/quizes/:quizId(\\d+)', quizController.update);

router.delete('/quizes/:quizId(\\d+)', quizController.delete);

router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res){
  res.render('quizes/creditos', {title: 'Creditos'});
});

module.exports = router;
