const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-leter');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification');
const finalMsg = document.getElementById('final-msg');

const figurePart = document.querySelectorAll('.figure-part');

const words = ['application','programming','book','footbal','appel','microsoft'];

let selectedWords = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//play again the game
function playAgain(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWords = words[Math.floor(Math.random() * words.length)];
    popup.style.display='none'
    displayWord();
    showWrongWords();
}



//show wrong words and parts
function showWrongWords(){

    //display wrong letters
    wrongLetterEl.innerHTML= `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>':'' }
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figurePart.forEach((part,index) => {
        const error = wrongLetters.length;
        if(index < error){
            part.style.display='block';
        }else{
            part.style.display='none';
        }
    });

    //check the length
    if(figurePart.length === wrongLetters.length){
        finalMsg.innerText = 'Unfortunatly, You Lost'
        popup.style.display='flex';
    }
}

//show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}

//display the words
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWords
    .split('')
    .map(letter => `<span class='letter'>
        ${correctLetters.includes(letter) ? letter : ''}</span>`
        ).join('')}
        `;
        const innerWord = wordEl.innerText.replace(/\n/g, '');
        if(innerWord === selectedWords){
            finalMsg.innerText = 'Congratulation! You Won'
            popup.style.display = 'flex';
        }
}
displayWord();

window.addEventListener('keydown', event => {
    if(event.keyCode >= 65 && event.keyCode <= 90){
        const letter = event.key;
        if(selectedWords.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                showWrongWords();
            }else{
                showNotification();
            }
        }
    }
}
);

playBtn.addEventListener('click',playAgain);