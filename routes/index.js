var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);

router.get('/quizes/answer', quizController.answer);

router.get('/author', function(req, res){
  res.render('quizes/creditos', {title: 'Creditos'});
});

module.exports = router;
