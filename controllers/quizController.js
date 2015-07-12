var models = require('../models/models.js');


exports.load = function(req,res,next,quizId){
  models.Quiz.findById(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else {next (new Error('No existe el quiz número '+ quizId)); }
    }
  ).catch(function(error){next(error);});
}



exports.quizes = function(req,res){
    models.Quiz.findAll().then(function(quizes){
        res.render('quizes/quizes.ejs', {quizes: quizes});
    })

};

exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  res.render('quizes/show', {quiz:req.quiz});
  })
};

exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  if(req.query.respuesta === quiz.respuesta){
    res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'})
  }
  else {
    res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'})
  }
  })
};
