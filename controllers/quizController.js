var models = require('../models/models.js');


exports.load = function(req,res,next,quizId){
  models.Quiz.find({where:{id: Number(quizId)}, include: [{ model: models.Comment}] }).then(
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
        res.render('quizes/quizes.ejs', {quizes: quizes, errors:[]});
    })

};

exports.sQuizes = function(req,res){
  models.Quiz.findAll({where:["pregunta like ?", '%' +req.query.search+ '%']}).then(function(quizes){
      res.render('quizes/quizes.ejs', {quizes: quizes, errors:[]});
  })

};


exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  res.render('quizes/show', {quiz:req.quiz, errors:[]});
  })
};

exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  if(req.query.respuesta === quiz.respuesta){
    res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'})
  }
  else {
    res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors:[]})
  }
  })
};


exports.newQuiz = function(req,res){
  var quiz = models.Quiz.build({
      pregunta: "Pregunta", respuesta: "Respuesta"
  });

    res.render('quizes/new', {quiz: quiz, errors:[]});
};

exports.createQuiz = function(req,res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }
      else{
        quiz.save({ fields:['pregunta', 'respuesta', 'tema']}).then(function(){
            res.redirect('/quizesList')
        })
      }
    }
  );

};


exports.edit = function(req,res){
  var quiz = req.quiz;

  res.render('quizes/edit', {quiz:quiz, errors:[]});
};


exports.update = function(req,res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then(function(err){
    if(err){
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    }
    else{
      req.quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then( function(){res.redirect('/quizesList');});
    }
  });


};


exports.delete = function(req,res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizesList');
  }).catch(function(error){next(error)});


};
