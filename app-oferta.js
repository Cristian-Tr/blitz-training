document.addEventListener('DOMContentLoaded', function () {


     // Stars field
  window.onload = function () {

    var pageContainer = this.document.getElementById("products");
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
  
  const image = document.querySelector(".productImage img");
    const optionsMode = document.querySelector(".options");
    const inputMode = document.querySelector(".input-mode");
    const options = document.querySelectorAll(".options .option");

    const mainModal = document.querySelector(".hint-modal");
    const closeModalBtn = mainModal.querySelector(".modal-body span");
    const modalHint = mainModal.querySelector(".modal-body .theHint");
    const hintText = modalHint.querySelector("p");
    const gameOver = mainModal.querySelector(".modal-body .gameover");

    const scoreDisplay = gameOver.querySelector("p");
    const progress = document.querySelector(".quest-num");

    const modeBtn = document.querySelector(".buttons .mode");
    const skipBtn = document.querySelector(".buttons .skip");

    const input = document.querySelector(".input-mode input");
    const submitBtn = document.querySelector(".input-mode button");
    const resetBtn = document.querySelector(".resetBtn");


    var index = 0;
    var score = 0;
    var mode = 0;

    var question = [{
        photo: "beciul domnesc rosu dulce.png",
        choices: ["Beciul Domnesc roșu dulce - cabernet sauvignon 12% recomandări: desert", "Grand Reserve roșu demisec - fetească albă 14% recomandări: peăte, desert", "Beciul Domnesc roșu sec - fetească regală, pinot noir 14.5% carne, pește, desert", "Beciul Domnesc roșu demidulce - tămâioasă românească 11.5% recomandări: carne"],
        hint: "B _ _ _ _ l D _ _ _ _ s _ - c _ _ _ _ _ _ t s _ _ v _ g _ _ _",
        answer: 0

    },
    {
        photo: "ciocarlia alb demisec.png",
        choices: ["Ciocârlia alb dulce - fetească neagră 13.5% recomandări: gratar, desert", "Ciocârlia alb demidulce - fetească neagră 14% recomandări: aperitiv. gratar", "Ciocârlia alb demisec - fetească regală 12% recomandări: aperitiv. gratar, pește, desert", "Ciocârlia alb sec - tămâioasa românească 11% recomandări: aperitiv. desert"],
        hint: "_ i _ _ _ _ _ _ a - f _ _ _ _ _ _ a  _ e _ _ _ a",
        answer: 2

    },
    {
        photo: "comoara pivnitei rosu sec.png",
        choices: ["Comoara pivniței roșu demisec - tămâioasă româneasca 14.5% recomandări: carne", "Vinoteca roșu sec - fetească neagră 17% recomandări: pește, fructe de mare", "Comoara pivniței roșu dulce - fetească albă 10.5% recomandări: aperitiv, desert", "Comoara pivniței roșu sec - fetească neagră 14.5% recomandări: carne, brânză"],
        hint: "_ _ m _ _ _ a _ i _ _ _ _ _  e _ - m _ _ _ _ t",
        answer: 3

    },
    {
        photo: "egregio alb sec.png",
        choices: ["Beciul Domnesc alb demisec - merlot 12.5% recomandări: aperitiv, carne, pește", "Egregio alb sec - chardonnay 14.5% recomandări pește, fructe de mare, salate", "Egregio alb dulce - fetească neagră 12% recomandări paste, pește, desert", "Grand Reserve alb demisec -  fetească albă recomandări: salate, desert"],
        hint: "_ g _ _ _ i _ - _ h _ _ _ _ n _ _ _",
        answer: 1

    },
    {
        photo: "grand reserve alb sec.png",
        choices: ["Beciul Domnesc alb dulce - pinot noir 14% recomandări: aperitiv, desert", "Sceptrus alb dulce - fetească neagră 13% recomandări: aperitiv, pește, paste, desert", "Grand Reserve rose demidulce - pinot noir 12.5% recomandări: aperitiv", "Grand Reserve alb sec - chardonnay 14.5% recomandări: carne, pește, salate"],
        hint: "_ _ a _ _  _ e _ _ r _ e - _ _ a _ _ _ _ _ _ y",
        answer: 3
    },
    {
        photo: "mirabilis machina alb sec.png",
        choices: ["Egregio alb sec - fetească neagră 10.5% recomandări: aperitiv, carne, pește", "Mirabilis Machina alb sec - blanc de noir 13.5% recomandări: salate, crustacee", "Mirabilis Machina alb dulce - pinot noir 13% recomandări: aperitiv, desert", "Mirabilis Machina alb demidulce - fetească albă 10% recomandări: crustacee, desert"],
        hint: "_ _ _ _ b _ _ _ _  _ _ c _ _ _ a - _ i _ _ _  _ _ i _",
        answer: 1
    },
    {
        photo: "proles pontica rosu demidulce.png",
        choices: ["Beciul Domnesc roșu sec - pinot noir 13% recomandări: carne, pește", "Proles Pontica roșu dulce - fetească albă 15% recomandări: aperitiv, pește, desert", "Proles Pontica roșu demidulce - merlot, pinot noir 12% recomandări: friptura", "Sigillum Moldavie roșu sec - fetească neagră 12.5% recomandări: gratar, pește"],
        hint: "_ r _ _ _ _  _ o _ _ _ _ _  - m _ _ _ _ t  p _ _ _ _  _ _ _ r",
        answer: 2

    },
    {
        photo: "rose verite rose sec.png",
        choices: ["Ciocârlia rose dulce - fetească regală 12% recomandări: aperitiv, desert", "Rose verite roșu dulce - fetească neagră 14% recomandări: aperitiv, desert", "Sigillum Moldavie rose dulce - fetească albă 14.5% recomandări: brânză, desert", "Rose verite rose sec - cabernet sauvignon 14.5% recomandări: brânză, pește, risoto"],
        hint: "_ _ _ e  _ _ _ _ t _ - _ _ _ _ d _ _ n _ _",
        answer: 3
    },
    {
        photo: "sceptrus fume alb sec.png",
        choices: ["Sigillum Moldavie alb dulce - tămâioasă românească 10.5% recomandări: aperitiv", "Sceptrus fume alb sec - chardonnay, sauvignon blanc 14.5% recomandări: carne", "Mirabilis Machina alb demisec - fetească regală 13% recomandări: brânză, salata", "Grand Reserve alb dulce - tămâioasă românească 12% recomandări: aperitiv, risoto"],
        hint: "_ c _ _ _ _ _ s   _ u _ _  -  c _ _ _ _ _ _ _ ",
        answer: 1
    },
    {
        photo: "sigillum moldavie rosu demisec.png",
        choices: ["Proles Pontica roșu demidulce - merlot 12% recomandări: friptură, brânză, aperitiv", "Grand Reserve roșu sec - pinot noir 14% recomandări: aperitiv, gratar, pește", "Sigillum Moldavie roșu demisec - fetească neagră 13% recomandări: carne", "Sceptrus roșu dulce - pinot noir 12% recomandări: aperitiv, pește, desert "],
        hint: "_ _ g _ _ _ u _  _ _ l _ _ _ _ e  -  _ e _ e _ _ _ _   _ e _ _ _ a",
        answer: 2

    }
    ];




    window.addEventListener("keypress", konami);
    options.forEach((element) => {
        element.addEventListener("click", check);
    });

    submitBtn.addEventListener("click", check);
    resetBtn.addEventListener("click", replay);

    modeBtn.addEventListener("click", switchMode);

    closeModalBtn.addEventListener("click", () => mainModal.style.display = "none");

    skipBtn.addEventListener("click", () => {
        if (index < question.length - 1) {
            index++;
            init();
        } else {
            displayScores();
        }
    });

    var randQuestion = shuffle(question.slice());

    function check() {
        let userInput;
        if (mode == 0) {
            userInput = this.textContent;
        } else {
            userInput = input.value.trim();
            input.value = "";
        }
        userInput === randQuestion[index].choices[randQuestion[index].answer] ? score++ : "";
        console.log(userInput);
        console.log(randQuestion[index].choices[randQuestion[index].answer]);
        if (index < question.length - 1) {
            index++;
            init();
        } else {
            displayScores();
        }

    }

    function switchMode() {
        if (mode == 0) {
            optionsMode.style.display = "none";
            inputMode.style.display = "block";
            modeBtn.innerText = "Options Mode";
            mode++;
        } else {
            inputMode.style.display = "none";
            optionsMode.style.display = "block";
            modeBtn.innerText = "Direct Mode";
            mode = 0;
        }
    }

    function replay() {
        score = 0;
        index = 0;
        mode = 0;
        modalHint.style.display = "block";
        gameOver.style.display = "none";
        mainModal.style.display = "none";
        init();
    }

    function displayScores() {
        scoreDisplay.innerText = `${score} /  ${question.length}`
        modalHint.style.display = "none";
        gameOver.style.display = "block";
        mainModal.style.display = "block";
    }

    function init() {
        progress.innerText = `${index + 1} / ${question.length}`;
        console.table(randQuestion);
        console.log(index);
        let randOptions = shuffle(randQuestion[index].choices.slice());
        image.src = randQuestion[index].photo;
        for (let i = 0; i < options.length; i++) {
            options[i].innerText = randOptions[i];
        }

        hintText.innerText = randQuestion[index].hint;
    }

    function shuffle(arr) {
        for (let i = 0; i < arr.length; i++) {
            let rand = Math.ceil(Math.random() * arr.length - 1);
            let temp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = temp;
        }
        return arr;
    }

    let testWord = "test";
    let wordArr = [];

    function konami(e) {
        wordArr.push(e.key);
        if (wordArr.length > testWord.length) {
            wordArr.shift();
        }
        console.log(wordArr);
        if (wordArr.join("").toLowerCase() === testWord) {
            console.log("Succes");
            hintText.innerText = randQuestion[index].choices[randQuestion[index].answer];
        }
    }

    init();













});