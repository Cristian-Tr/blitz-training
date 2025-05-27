document.addEventListener('DOMContentLoaded', function () {


    // Stars field
    window.onload = function () {

        var pageContainer = this.document.getElementById("quiz");
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

    const image = document.querySelector(".quizImage img");
    const question = document.querySelector(".quizQuestion b");
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

    var quiz = [{
        photo: "1.png",
        interview: "Ce faci dacă primești un mesaj de la un necunoscut care îți cere date personale?",
        choices: ["Îi răspunzi și îi oferi datele cerute", "Îi ceri detalii mai înainte", "Îl blochezi și îl raportezi platformei", "Ignori mesajul și nu faci nimic"],
        hint: "b _ _ c _ _ _ i ",
        answer: 2

    },
    {
        photo: "2.png",
        interview: "Cât de des trebuie schimbate parolele conturilor online?",
        choices: ["Săptămânal", "O dată la câteva luni", "Niciodată", "Doar dacă suspectezi ceva"],
        hint: " l _ _ i",
        answer: 1

    },
    {
        photo: "3.png",
        interview: "Ce înseamnă phishing în contextul siguranței online? ",
        choices: ["Obținerea datelor confidențiale prin înșelăciune", "Un joc online foarte popular", "Un program antivirus nou", "O metodă de a descărca rapid fișiere"],
        hint: "c _ n _ _ _ _ n _ _ _ l _ ",
        answer: 0

    },
    {
        photo: "4.png",
        interview: "Cum poți crea o parolă puternică?",
        choices: ["Utilizând numele tău", "Folosind litere, cifre, simboluri", "Alegând un cuvânt scurt", "Selectând aleatoriu 4 cifre"],
        hint: " c _ _ b _ _ _ _ i _",
        answer: 1

    },
    {
        photo: "5.png",
        interview: "Ce informații NU trebuie să postezi într-un cont public online?",
        choices: ["Numele tău de utilizator", "Adresa, nr. de telefon, parolele", "O fotografie cu ciocolata preferată", "Hobby-urile preferate"],
        hint: "_ _ r _ _ a ",
        answer: 1
    },
    {
        photo: "6.png",
        interview: "Ce trebuie să verifici înainte de a da click pe un link? ",
        choices: ["Autenticitatea imaginilor care însoțesc linkul", "Corectitudinea gramaticală a linkului", "Prezența unei o oferte în link", "Dacă URL-ul linkului începe cu https://"],
        hint: "h _ _ p _ ",
        answer: 3
    },
    {
        photo: "7.png",
        interview: "Pentru ce este util un software antivirus?",
        choices: ["Detectează și elimină viruși", "Economisește energia dispozitivului", "Mărește viteza de navigare", "Permite descărcarea gratuită a jocurilor"],
        hint: " d _ _ _ _ _ a",
        answer: 0

    },
    {
        photo: "8.png",
        interview: "Ce este un cookie în contextul navigării pe internet?",
        choices: ["Un software ce conține viruși", "O aplicație de chat online", "Un fișier cu date despre preferințele tale", "Un tip de reclamă pop-up"],
        hint: " s _ _ c _ t",
        answer: 2
    },
    {
        photo: "9.png",
        interview: "De ce e periculos să întâlnești pe cineva cunoscut online?",
        choices: ["Poate fi plictisitor", "Prietenii tăi nu vor fi de acord", "S-ar putea să nu îți placă", "Nu știi ce intenții are"],
        hint: "i _ _ _ _ _ i _ _ e ",
        answer: 3
    },
    {
        photo: "10.png",
        interview: "Ce faci dacă cineva te hărțuiește online (cyberbullying)?",
        choices: ["Salvezi capturi de ecran și anunți părinții", "Răspunzi cu mesaje agresive", "Îl ignori până va înceta", "Îl blochezi și nu spui nimănui"],
        hint: "s _ _ _ e _ i",
        answer: 0

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
        if (index < quiz.length - 1) {
            index++;
            init();
        } else {
            displayScores();
        }
    });

    var randquiz = shuffle(quiz.slice());

    function check() {
        let userInput;
        if (mode == 0) {
            userInput = this.textContent;
        } else {
            userInput = input.value.trim();
            input.value = "";
        }
        userInput === randquiz[index].choices[randquiz[index].answer] ? score++ : "";
        console.log(userInput);
        console.log(randquiz[index].choices[randquiz[index].answer]);
        if (index < quiz.length - 1) {
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
        scoreDisplay.innerText = `${score} /  ${quiz.length}`
        modalHint.style.display = "none";
        gameOver.style.display = "block";
        mainModal.style.display = "block";
    }

    function init() {
        progress.innerText = `${index + 1} / ${quiz.length}`;
        console.table(randquiz);
        console.log(index);
        let randOptions = shuffle(randquiz[index].choices.slice());
        image.src = randquiz[index].photo;
        question.innerText = randquiz[index].interview;
        for (let i = 0; i < options.length; i++) {
            options[i].innerText = randOptions[i];
        }

        hintText.innerText = randquiz[index].hint;
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
            hintText.innerText = randquiz[index].choices[randquiz[index].answer];
        }
    }

    init();













});