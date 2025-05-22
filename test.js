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
        interview: "Ce faci dacă primești un mesaj de la un necunoscut care îți cere informații personale?",
        choices: ["Îi răspunzi imediat și îi dai informațiile cerute", "Îi ceri mai multe detalii despre el înainte de a răspunde", "Îi blochezi numărul și îl raportezi platformei", "Ignori mesajul, dar nu faci nimic altceva"],
        hint: "_ _   _ _ _ c _ _ _ i   n _ _ _ _ _ l",
        answer: 2

    },
    {
        photo: "2.png",
        interview: "Cât de des ar trebui să-ți schimbi parolele pentru conturile online?",
        choices: ["Săptămânal", "O dată la câteva luni", "Niciodată", "Doar dacă ți se pare ceva suspect"],
        hint: "_   _ _ t _   l _   c _ _ _ _ a  _ _ _ i",
        answer: 1

    },
    {
        photo: "3.png",
        interview: "Ce înseamnă phishing în contextul siguranței conturilor online? ",
        choices: ["Încercarea de a obține informații confidențiale prin înșelăciune", "Un tip de joc online foarte popular", "Un program antivirus nou", "O metodă de a descărca fișiere mai rapid"],
        hint: "_ n _ _ _ _ a _ _ _  _ _   a   o _ _ _ _ e",
        answer: 0

    },
    {
        photo: "4.png",
        interview: "Care este cel mai bun mod de a crea o parolă puternică?",
        choices: ["Utilizarea numelui și a datei de naștere", "O combinație de litere, cifre și simboluri", "Să folosești un singur cuvânt", "Memorarea aceleași parole pentru toate conturile"],
        hint: "S _   _ _ _ o _ _ _ _ i  o  c _ _ _ i _ _ _ i _",
        answer: 1

    },
    {
        photo: "5.png",
        interview: "Ce informații NU ar trebui să postezi niciodată într-un cont public online?",
        choices: ["Numele tău de utilizator", "Adresa poștală, nr. telefon, parole, detalii despre programul tău", "O fotografie cu ciocolata preferată", "Hobby-urile preferate"],
        hint: "_ _ r _ _ a    _ _ _ t _ l _ ",
        answer: 1
    },
    {
        photo: "6.png",
        interview: "Ce ar trebui să verifici înainte de a da click pe un link? ",
        choices: ["Doar dacă linkul conține imagini atractive", "Numai dacă mesajul este scris corect gramatical", "Dacă în link îți este prezentată o ofertă", "Dacă linkul te duce la o adresă web sigură, care începe cu https:..."],
        hint: "D _ c _    l _ _ k _ _    t _   _ _ c _    _ a",
        answer: 3
    },
    {
        photo: "7.png",
        interview: "De ce este important să folosești un program software antivirus actualizat?",
        choices: ["Pentru a detecta și elimina programe malware și viruși", "Fiindcă economisește energia dispozitivului", "Pentru a-ți putea mări viteza de internet", "Deoarece îți permite să descarci jocuri gratuite"],
        hint: "_ e _ _ _ u   _   d _ _ _ _ _ a    _ i   _ _ _ _ n _ ",
        answer: 0

    },
    {
        photo: "8.png",
        interview: "Ce este un cookie în contextul navigării pe internet?",
        choices: ["Un fișier dăunător care îți infectează calculatorul", "O aplicație de chat online", "Un fișier stocat pe dispozitivul tău, care reține informații despre tine", "Un tip de reclamă pop-up"],
        hint: "_ n   f _ _ i _ _    _ _ _ c _ t   _ _",
        answer: 2
    },
    {
        photo: "9.png",
        interview: "De ce e periculos să te întâlnești fizic cu persoane cunoscute online, fără supraveghere?",
        choices: ["Pentru că ar putea fi plictisitoare", "Deoarece prietenii tăi nu ar fi de acord", "Fiindcă s-ar putea să nu fie pe placul tău", "Pentru că nu știi cu adevărat cine sunt și intențiile lor"],
        hint: "P _ _ _ _ u   c _    n _    _ _ i i   c _   a _ _ _ _ _ _",
        answer: 3
    },
    {
        photo: "10.png",
        interview: "Ce ar trebui să faci dacă cineva te hărțuiește online (cyberbullying)?",
        choices: ["Să salvezi capturi de ecran și să vorbești cu părinții sau profesorii", "Să răspunzi cu mesaje la fel de agresive", "Să îl ignori, sperând că va înceta", "Să îl blochezi și să nu spui nimănui"],
        hint: "S _    _ _ _ _ e _ i   c _ _ _ _ r _ ",
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