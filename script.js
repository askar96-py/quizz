const data = { 
    questions : [
        {
            question : "Какой метод используется для удаления последнего элемента из списка в Python?",
            options: ["remove_last()", "pop()", "delete(-1)", "remove_end()"],
            answer: null,
            correct: "pop()"
        },
        {
            question : "Какая функция используется для преобразования строки в список?",
            options :["str_to_list()", "join()", "listify()", "split()"],
            answer: null,
            correct: "split()"
        },
        {
            question : "Какой метод используется для сортировки списка объектов в Python?",
            options: ["order()", "arrange", "sort()", "organize()"],
            answer: null,
            correct: "sort()"
        },
        {
            question : "Что такое list comprehension в Python, и как его использовать для создания списка?",
            options: ["List comprehension - это способ создания списков с использованием краткого синтаксиса.", 
                        "List comprehension - это только для работы с числами в Python", 
                        "List comprehension - это альтернативный способ создания функций в Python.", 
                        "List comprehension - это только для работы со строками в Python."],
            answer: null,
            correct: "List comprehension - это способ создания списков с использованием краткого синтаксиса."
        },
        {
            question : "Что такое рекурсия в программировании, и в чем ее отличие от циклов?",
            options: ["Рекурсия - это процесс, при котором функция вызывает саму себя. В отличие от циклов, рекурсия предоставляет альтернативный способ повторения кода.", 
            "Рекурсия и циклы выполняют одинаковые задачи, но рекурсия используется только для числовых вычислений.", "Рекурсия - это метод программирования, используемый только для создания графических интерфейсов.", 
            "Рекурсия и циклы представляют собой взаимозаменяемые концепции в программировании."],
            answer: null,
            correct: "Рекурсия - это процесс, при котором функция вызывает саму себя. В отличие от циклов, рекурсия предоставляет альтернативный способ повторения кода."
        }
    ],
    current_question: null
}

// index вопросов
let index = 0;

if (data.current_question === null ) {
    data.current_question = data.questions[index];
    uploadQuestionAndOptions(data.current_question);
}

// Загружает Вопросы в html
function uploadQuestionAndOptions(current_question) {
    let question = document.querySelector('.question');
    question.textContent = current_question.question;

    let answers = document.querySelectorAll('.answer-btn');
    let itemIndex = 0;
    // Загружаем варианты
    answers.forEach(answer => {
        answer.textContent = current_question.options[itemIndex++];
    });
}

// Очистка. Убирает все варианты
function clearAnswer() {
    let answers = document.querySelectorAll('.answer-btn'); // исправлен селектор
    answers.forEach(answer => {
        answer.classList.remove('click');
    });
}

// Выбор варианта
function selectAnswer(btn_id) {
    clearAnswer();
    let answer = document.getElementById(btn_id);
    answer.classList.toggle('click');
    data.current_question.answer = answer.textContent;
}

// Следующий вопрос
function nextQuestion() {

    if (data.current_question.answer === null) {
        alert("Выберите вариант!");
    } else {
        index++;
        if (index+1 === data.questions.length) {
            let next = document.querySelector('.next');
            next.style.display = 'none';
            
            let finish = document.querySelector('.finish');
            finish.style.display = 'block';
        }
        data.current_question = data.questions[index];
        clearAnswer();
        uploadQuestionAndOptions(data.current_question);
    }
}


function finishQuizz() {
    let container = document.querySelector('.container');
    container.style.display = 'none';

    let result = document.querySelector('.result');
    result.style.display = 'block';

    let correct = 0;
    for (let i = 0; i < data.questions.length; i++) {
        let question_data = data.questions[i];

        let newQuestion = document.createElement('div');
        newQuestion.classList.add("result__question", "text");
        newQuestion.textContent = question_data.question; // исправлено, используйте textContent

        result.appendChild(newQuestion);

        let newList = document.createElement('ul');
        newList.classList.add("result__list");

        question_data.options.forEach(function (itemText) {
            let listItem = document.createElement('li');
            listItem.textContent = itemText;
            listItem.classList.add('result__btn', 'text');

            if (itemText === question_data.answer && itemText === question_data.correct) {
                listItem.classList.add('correct');
                correct++;

            } else if (itemText === question_data.answer && itemText !== question_data.correct) {
                listItem.classList.add('incorrect');
            } else if (itemText !== question_data.answer && itemText === question_data.correct) {
                listItem.classList.add('correct')
            }

            newList.appendChild(listItem);
        });

        result.appendChild(newList);
    }
    let newComment = document.createElement('p')
    newComment.classList.add('result__comment','text')
    if (correct >= 4) {
        newComment.textContent = "Не плохо!"
    } else if (correct >= 2) {
        newComment.textContent = "Повтори материал!"
    } else {
        newComment.textContent = "Ужас!"
    }

    result.appendChild(newComment);
}
