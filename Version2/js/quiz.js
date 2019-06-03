angular.module('ngQuiz', ['ngSanitize'])

.controller('ngQuizController', function($scope, $timeout, quizProgress, scoreKeeper) {
  $scope.quizProgress = quizProgress;

  $scope.quizData = {
    "quizMetadata": {
      "title": "Veamos tu aprendizaje!",
      "intro": "Diviertete aprendiendo, te invitamos a contestar la siguiente dinámica y verás que tanto haz aprendido !",
      "introImg":"https://image.flaticon.com/icons/svg/1646/1646100.svg"
    },
    "quizQuestions": [{
      "question": "Selecciona el nombre del Arquetipo al que pertenesca la siguiente imagen:",
      "questionImg": "img/111.png",
      "feedback": "Pese a que dentro de una empresa utiiza maquinarias de produccion, cuando existe una demora ésta llega a ocasionar un desastre en el sistema",
      "options": [{
        "name": "Arquetipo de Compensación y Demora.",
        "correct": true
      }, {
        "name": "Arquetipo de Desplazamiento de la carga hacia la Intervención.",
        "correct": false
      }, {
        "name": "Arquetipo de Tragedia Común.",
        "correct": false
      },
        {
        "name": "Arquetipo de Limites de crecimiento.",
        "correct": false
      }]
    }, {
      "question": "Selecciona el nombre del Arquetipo al que pertenesca la siguiente imagen:",
      "questionImg": "img/333.png",
      "feedback": "Aqui se plantea una solucion A de corto plazo para que se pueda resolver problemas  inmediatos. Pero, cuando ésta  se sigue usando cada vez más, con el tiempo ésta solución va crando una dependencia que pude ya no ser tan viable.",
      "options": [{
        "name": "Arquetipo de Escalada.",
        "correct": false
      }, {
        "name": "Arquetipo de Compensación entre Proceso y Demora.",
        "correct": false
      }, 
      {
        "name": "Arquetipo de Éxito para quien tiene Éxito.",
        "correct": false
      },{
        "name": "Arquetipo de Desplazamiento de la Carga.",
        "correct": true
      }]
    }, {
      "question": "Selecciona el nombre del Arquetipo al que pertenesca la siguiente imagen:",
      "questionImg": "img/555.png",
      "feedback": "Ocurre cuando se empleó una esrtuctura de la carga, que implicaba dar una solución a corto plazo, es aquí donde llega a tener un impacto en las metas fundamentales que se plantearon a largo plazo..",
      "options": [{
        "name": "Arquetipo de Cremiento y Subinversión.",
        "correct": false
      }, {
        "name": "Arquetipo de Soluciones rápidas que fallan.",
        "correct": false
      },{
        "name": "Arquetipo de Limites de Crecimiento.",
        "correct": false
      }, {
        "name": "Arquetipo de Erosión de Metas.",
        "correct": true
      }]
    }, {
      "question": "Selecciona el nombre del Arquetipo al que pertenesca la siguiente imagen:",
      "questionImg": "img/666.png",
      "feedback": "Toma en cuenta a dos personas u organizaciones, donde su bienestar depende de la ventaja que pueda tener una de la otra.",
      "options": [{
        "name": "Arquetipo de Escalada",
        "correct": true
      }, {
        "name": "Arquetipo de Erosión de Metas",
        "correct": false
      },{
        "name": "Arquetipo de Crecimiento y Subinversión",
        "correct": false
      }, {
        "name": "Arquetipo de Límites de Crecimiento",
        "correct": false
      }]
    }, 
    
    {
      "question": "Selecciona el nombre del Arquetipo al que pertenesca la siguiente imagen:",
      "questionImg": "img/999.png",
      "feedback": "Se dicta una solución que es planeada a coto plazo, pero éstas llegan tener consecuencias a largo plazo, las cuales muchas de las veces son imprevistas y requieren una mejor solución.",
      "options": [{
        "name": "Arquetipo de Éxito para quien tiene Éxito",
        "correct": false
      }, {
        "name": "Arquetipo de Crecimiento y Subinversión",
        "correct": false
      },{
        "name": "Arquetipo de Desplazamiento de la Carga",
        "correct": false
      }, {
        "name": "Arquetipo de Soluciones Rápidas",
        "correct": true
      }]
    }, {
      "question": "¿Qué es un arquetipo sistémico?",
      "questionImg": "img/arquetipo.png",
      "feedback": "Buen trabajo, eres genial.”",
      "options": [{
        "name": "Son capaces de establecer el funcionamiento de un sistema autónomo",
        "correct": false
      }, {
        "name": "Son capaces de crear patrones que llegan a establecer el comportamiento de un sistema y nos permite ver los errores que se comenten  en una organizacion.",
        "correct": true
      },
      {
        "name": "Son procedimientos que indican como debe ser utilizado un sistema, además de que, solo es utilizados por ciertos miembros de la empresa.",
        "correct": false
      }, {
        "name": "Son capaces de crear procesos que definen como van a actuar los empleados ante la llegada de un nuevo sistema",
        "correct": false
      }]

    },
     {
      "question": "¿Selecciona el arquetipo del que estamos hablando?",
      "questionImg": "img/8.8.png",
      "feedback": "En esta sección los individuos utilizan un recurso comun pero limitado, por lo que, únicamente repara las necesidades individuales.",
      "options": [{
        "name": "Arquetipo de Tragedia Común",
        "correct": true
      }, {
        "name": "Arquetipo de Erosión.",
        "correct": false
      },
      {
        "name": "Arquetipo de Límites de Crecimiento",
        "correct": false
      }, {
        "name": "Arquetipo de Soluciones Rápidas",
        "correct": false
      }]
    }]
  };

  $scope.quizQuestions = $scope.quizData.quizQuestions;
  $scope.quizMetadata = $scope.quizData.quizMetadata;
  quizProgress.lastQuestion = $scope.quizQuestions.length;
  quizProgress.loading = false;

  $scope.startQuiz = function() {
    quizProgress.inProgress = true;
    quizProgress.currentQuestion = 0;
    quizProgress.imageToPreload = 1;
  };

  $scope.nextQuestion = function() {
    if (quizProgress.currentQuestion < quizProgress.lastQuestion) {
      quizProgress.currentQuestion = quizProgress.currentQuestion + 1;
      quizProgress.currentQuestionFriendly = quizProgress.currentQuestionFriendly + 1;
      quizProgress.imageToPreload = quizProgress.imageToPreload + 1;
    }
  };

  $scope.answerQuestion = function(data) {
    $scope.quizQuestions[quizProgress.currentQuestion].answered = true;
    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.name === data.selected) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
    });
  };

  $scope.checkAnswer = function() {
    $scope.quizQuestions[quizProgress.currentQuestion].answerChecked = true;

    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.selected) {
        if (obj.correct) {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = true;
        } else {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = false;
        }
      }
    });
  };

  $scope.getScore = function() {
    quizProgress.inProgress = false;
    quizProgress.finished = true;
    quizProgress.calculatingScore = true;
    $scope.score = scoreKeeper.calculateScore($scope.quizQuestions);

    $timeout(function() {
      quizProgress.calculatingScore = false;
    }, 1000);
  };

  $scope.startOver = function() {
    angular.forEach($scope.quizQuestions, function(obj) {
      obj.answered = false;
      obj.answerWasRight = false;
      obj.answerChecked = false;

      angular.forEach(obj.options, function(option) {
        option.selected = false;
      });
    });

    quizProgress.inProgress = true;
    quizProgress.finished = false;
    quizProgress.currentQuestion = 0;
    quizProgress.currentQuestionFriendly = 1;
  };
})

.factory('quizProgress', function() {
  return {
    currentQuestion: 0,
    imageToPreload: 0,
    currentQuestionFriendly: 1,
    lastQuestion: 0,
    loading: true,
    inProgress: false,
    finished: false,
    calculatingScore: false
  };
})

.service('scoreKeeper', function() {
  this.calculateScore = function(quizQuestions) {
    var rightAnswers = 0;
    angular.forEach(quizQuestions, function(obj) {
      if (obj.answerWasRight) {
        rightAnswers += 1;
      }
    });

   
      return ((rightAnswers / quizQuestions.length) * 100).toFixed() + '%';
    

  };
})

.directive('progressBar', function(quizProgress) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress', function(newVal, oldVal) {
        if (newVal) {
          element.css('width', ((quizProgress.currentQuestionFriendly / quizProgress.lastQuestion) * 100 + '%'));
        }
      }, true);
    }
  };
})

.directive('imagePreload', function(quizProgress) {
  return {
    restrict: 'EA',
    template: "<img style='display:none;' ng-src='{{quizQuestions[quizProgress.imageToPreload].questionImg}}'/>"
  };
})

.directive('animateProgression', function(quizProgress, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress.currentQuestion', function(newVal, oldVal) {
        if (newVal) {
          element.addClass('question-animate');
          $timeout(function() {
            element.removeClass('question-animate');
          }, 1500);
        }
      });
    }
  };
});