var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');
var commentController = require('../controllers/commentController');
var sessionController = require('../controllers/sessionController');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


router.param('quizId', quizController.load);
router.param('commentId', commentController.load);


router.get('/quizesList', quizController.quizes);

router.get('/quizes', quizController.sQuizes);

router.get('/quizes/new', sessionController.loginRequired, quizController.newQuiz);

router.post('/quizes/create', sessionController.loginRequired, quizController.createQuiz);

router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);

router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.delete);

router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);



router.get('/author', function(req, res){
  res.render('quizes/creditos', {title: 'Creditos'});
});

module.exports = router;
