angular.module('ngQuiz', ['ngSanitize'])

.controller('ngQuizController', function($scope, $timeout, quizProgress, scoreKeeper) {
  $scope.quizProgress = quizProgress;

  $scope.quizData = {
    "quizMetadata": {
      "title": "Veamos tu aprendizaje!",
      "intro": "Do you know The Day of the Programmer is an international professional day that is celebrated on the 256th (hexadecimal 100th, or the 28th) day of each year (September 13 during common years and on September 12 in leap years).!",
      "introImg":"https://image.flaticon.com/icons/svg/1646/1646100.svg"
    },
    "quizQuestions": [{
      "question": "Which statement is true or false regarding 3D bio-printing?",
      "questionImg": "http://sites.hss.com/Images/Quiz/3DPrinting.jpg",
      "feedback": "Bio-printing is a medical research on the 3D creation of complex structures from living tissue.",
      "options": [{
        "name": "3D organic food printing.",
        "correct": false
      }, {
        "name": "3D printing living tissues.",
        "correct": true
      }, {
        "name": "3D ecological printing.",
        "correct": false
      },
        {
        "name": "3d printing on a nano-particle scal.",
        "correct": false
      }]
    }, {
      "question": "Which programming languages appear in word search image?",
      "questionImg": "http://sites.hss.com/Images/Quiz/WordSearch.jpg",
      "feedback": "We use all these technologies to build our applications at HSS and PYTHON mainly used for personal projects. Need some ideas ask Gary about rasberry pi + python.",
      "options": [{
        "name": "CSHARP,  PYTHON,  JAVASCRIPT,  JQUERY,  ANGULAR,  JAVA.",
        "correct": true
      }, {
        "name": "HTML,  PYTHON,  RUBY,  JQUERY,  ANGULAR,  JAVA, SQL.",
        "correct": false
      }, {
        "name": "CPLUS,  PYTHON,  JAVASCRIPT,  JQUERY,  ANGULAR,  JAVA.",
        "correct": false
      }]
    }, {
      "question": "IT applications that exist in HSS and some have been made up. Can you tell which is which?",
      "questionImg": "http://sites.hss.com/Images/Quiz/ITApplications.jpg",
      "feedback": "These are only few of our applications and the list still growing.",
      "options": [{
        "name": "Heat, Amazon, Jira, Paypal, hssworld, LogMe.",
        "correct": false
      }, {
        "name": "Ebay, Amazon, Paypal, Spanner, hssworld, LogMe.",
        "correct": false
      }, {
        "name": "Heat, Jira, Spanner, hssworld, LogMe.",
        "correct": true
      }]
    }, {
      "question": "Which games are these?",
      "questionImg": "http://sites.hss.com/Images/Quiz/NameTheGame.jpg",
      "feedback": "According to SteamSpy, Counter-Strike: Global Offensive has sold 25 million units. This surpasses Minecraft's sales, which number 24.5 million, making CS:GO the bestselling PC game of the Steam era, and probably of all time.",
      "options": [{
        "name": "Counter Strike, Red Alert",
        "correct": true
      }, {
        "name": "Red Alert, Call of Duty",
        "correct": false
      }, {
        "name": "Command and Conquer, Red Alert",
        "correct": false
      }]
    }, {
      "question": "What are the steps you would take if your computer is not functioning as expected?",
      "questionImg": "http://sites.hss.com/Images/Quiz/ComputerFix.jpg",
      "feedback": "Well done you have made it to IT Crowd family.”",
      "options": [{
        "name": "Is your mouse external devices connected to computer i.e mouse, keyboard specially network cable",
        "correct": false
      }, {
        "name": "Check Computer Services running virus scan at odd time i.e 09:00.am in the morning where most work get done",
        "correct": false
      }, {
        "name": "Have you tried turning off and on agian",
        "correct": true
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
    }, 1500);
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