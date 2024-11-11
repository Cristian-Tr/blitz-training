document.addEventListener('DOMContentLoaded', function () {

  // Stars field
  window.onload = function () {

    var pageContainer = this.document.getElementById("survey");
    var width = pageContainer.clientWidth;
    var height = pageContainer.clientHeight;
    // Random stars
    for (let i = 0; i < 500; i++) {
      var starX = Math.random() * 99.5;
      var starY = Math.random() * 96;

      if (starX < width && starY < height) {
        let star = this.document.createElement('div');
        star.style.width = "0.01em";
        star.style.height = "0.01em";
        star.style.background = "white";
        star.style.position = "absolute";
        star.style.top = starY + "%";
        star.style.left = starX + "%";
        star.style.borderRadius = "50%";

        pageContainer.appendChild(star);
      }
    }
  };
  // Format question
  function FormatQuestion(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
  }
  // If option is correct answer then return true
  FormatQuestion.prototype.correctAnswer = function (option) {
    return this.answer === option;
  };
  // Format questionnaire
  function Questionnaire(questions) {
    // Array of questions
    this.questions = questions;
    // Start quiz with the first question
    this.questionIndex = 0;
    this.score = 0;
  }
  Questionnaire.prototype.currentQuestion = function () {
    return this.questions[this.questionIndex];
  };
  Questionnaire.prototype.checkAnswer = function (answer) {
    if (this.currentQuestion().correctAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  };
  // Check if quiz end is reached
  Questionnaire.prototype.isOver = function () {
    // Return TRUE only after last question
    return this.questionIndex >= this.questions.length;
  };
  // Format questionnaire
  var QuestionnaireFormat = {
    displayNext: function () {
      if (quiz.isOver()) {
        this.showResults();
      } else {
        this.displayQuestion();
        this.displayOptions();
        this.displayState();
        this.displayScore();
      }
    },
    displayQuestion: function () {
      this.fillingWithText('table', quiz.currentQuestion().text);
    },
    displayOptions: function () {
      var options = quiz.currentQuestion().options;
      // Display all options
      for (var i = 0; i < options.length; i++) {
        var optionId = 'option' + i;
        var optionText = options[i];
        this.fillingWithText(optionId, optionText);
        this.checkAnswerOrganizer(optionId, optionText);
      }
    },
    checkAnswerOrganizer: function (id, guess) {
      var button = document.getElementById(id);
      button.onclick = function () {
        quiz.checkAnswer(guess);
        QuestionnaireFormat.displayNext();
      }
    },
    displayScore: function () {
      var scoreText = 'Score: ' + quiz.score;
      this.fillingWithText('score', scoreText);
    },
    displayState: function () {
      var questionNumber = quiz.questionIndex + 1;
      var totalQuestions = quiz.questions.length;
      var showState = '' + questionNumber + ' / ' + totalQuestions;
      this.fillingWithText('page', showState);
    },
    showResults: function () {
      var grade = quiz.score / quiz.questions.length;
      var results = '<h1>';

      results += '<h1>Scor final: <br><br>' + quiz.score + ' puncte</h1>';
      if (grade >= 0.8) {
        results += '<h2><br>😊<br>FELICITĂRI!<br>EȘTI FOARTE BINE PREGĂTIT PENTRU VIZITE CU SUCCES!</h2>';
      } else if (grade < 0.8 && grade > 0.5) {
        results += '<h2><br>😉<br>BRAVO!<br>EȘTI DESTUL DE BINE PREGĂTIT PENTRU VIZITE CU SUCCES!</h2>';
      } else {
        results += '<h2><br>😞<br>SORRY!<br>TREBUIE SĂ DOBÂNDEȘTI CUNOȘTINȚE NOI DESPRE TEHNICA VÂNZĂRILOR!</h2>';
      }
      results += '<br><button id="reset">Mai încerci încă o dată?</button>';
      this.fillingWithText('survey', results);
      this.resetQuestionnaire();
    },
    resetQuestionnaire: function () {
      var resetBtn = document.getElementById('reset');
      // Restart from the beginning
      resetBtn.onclick = function () {
        window.location.reload(false);
      }
    },
    fillingWithText: function (id, content) {
      var element = document.getElementById(id);
      element.innerHTML = content;
    }
  };
  // Create questions
  var questions = [
    new FormatQuestion('&#9725; PREGĂTIREA VIZITEI &#9725;<br>Ce trebuie să facem înainte de a vizita o locație?', ['Curățăm pantofii', 'Memorăm o comanda valoroasă', 'Stabilim un obiectiv', 'Îi dăm telefon supervisor-ului'], 'Stabilim un obiectiv'),
    new FormatQuestion('&#9725; STABILIREA CONTACTULUI &#9725;<br>Cu cine discutăm pentru a obține o comandă?', ['Doar cu patronul', 'Cu orice angajat', 'Cu șeful de magazin', 'Cu persoana cheie'], 'Cu persoana cheie'),
    new FormatQuestion('&#9725; EXPLORAREA CLIENTULUI &#9725;<br>Ce vom urmări după ce vom intra într-o locație?', ['Numărul vânzătoarelor din locație', 'Afișarea autorizației de functionare', 'Dotarea cu aer condiționat', 'Stocul de produse și promoțiile'], 'Stocul de produse și promoțiile'),
    new FormatQuestion('&#9725; IDENTIFICAREA NEVOILOR &#9725;<br>Cum putem afla nevoile unui client nou?', ['Prin întrebări închise, deschise, de direcționare', 'Facem un sondaj printre cumpărători', 'Utilizăm un simulator pe internet', 'Prezentăm dezavantajele produselor competiției'], 'Prin întrebări închise, deschise, de direcționare'),
    new FormatQuestion('&#9725; OBȚINEREA COMENZII &#9725;<br>Care este primul pas pt. a obține o comandă?', ['Oferim un set de pahare', 'Prezentăm oferta de produse', 'Spunem complimente', 'Implorăm patronul să facă o comandă'], 'Prezentăm oferta de produse'),
    new FormatQuestion('&#9725; CARACTERISTICILE PRODUSULUI &#9725;<br>Este clientul interesat de caracteristicile produsului?', ['Da', 'Nu', 'Doar dacă le transformăm în beneficii pt. client', 'Doar dacă îi oferim o mostră'], 'Doar dacă le transformăm în beneficii pt. client'),
    new FormatQuestion('&#9725; BENEFICIILE CLIENȚILOR &#9725;<br>Ce fel de beneficii doresc clienții?', ['Promoții la TV', 'Profit mare, reducerea costurilor, economie de timp', 'Afișe promoționale', 'Cadouri pt. angajați'], 'Profit mare, reducerea costurilor, economie de timp'),
    new FormatQuestion('&#9725; MANEVRAREA OBIECȚIILOR &#9725;<br>Cum putem depăși o obiecție adevărată?', ['Furnizând o soluție', 'Contrazicând clientul', 'Rugăm clientul să discute cu supervizorul', 'Implorăm clientul să renunțe la obiecție'], 'Furnizând o soluție'),
    new FormatQuestion('&#9725; FINALIZAREA COMENZII &#9725;<br>Când putem finaliza comanda?', ['După ce am revenit în mașină', 'La 5 minute după începerea discuției', 'După aprobarea supervisorului', 'Când primim semnale favorabile de la client'], 'Când primim semnale favorabile de la client'),
    new FormatQuestion('&#9725; MERCHANDISING PRODUSE &#9725;<br>Când este recomandat să facem mercantizarea?', ['Imediat după ce intrăm în locație', 'În timp ce prezentăm oferta', 'Înainte de a finaliza comanda', 'După finalizarea comenzii'], 'După finalizarea comenzii')
  ];
  // Questionnaire initialization
  var quiz = new Questionnaire(questions);
  QuestionnaireFormat.displayNext();

});