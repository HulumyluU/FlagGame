
const countriesContainer = document.querySelector('.countries');
const WinCountryName = document.getElementById('name__country');
const allButtons = document.querySelectorAll('.btn');
const buttons = document.getElementsByTagName('button');
const score1 = document.querySelector('.score');
const menu = document.querySelector('.menu');
menu.addEventListener('click', function () {
   document.querySelector('.container__result').classList.add('hidden');
   scoreInformation = ``;
   window.location = `index.html`;
})
const btnElements = [
      document.querySelector('.btn1'),
      document.querySelector('.btn2'),
      document.querySelector('.btn3'),
      document.querySelector('.btn4')
];

// variables

let lifes = 4;
let score = 0;
localStorage.setItem('score', 50);
score1.textContent =  score;
let ob = {number: 0}
const arrFlags = ['albania','andorra','armenia','austria','azerbaijan','belarus','belgium','bosnia and herzegovina','bulgaria','croatia','cyprus','czech republic','denmark','estonia','finland','france','georgia','germany','greece','hungary','iceland','ireland','italy','kazakhstan','kosovo','latvia','liechtenstein','lithuania','luxembourg','malta','moldova','monaco','montenegro','netherlands','north macedonia','norway','poland','portugal','romania','russia','san marino','serbia','slovakia','slovenia','spain','sweden','switzerland','turkey','ukraine','united kingdom','vatican city'];

//
const renderCountry = function (data, result) {
   if (ob.number > 3) ob.number = 0;
   if (result === 'win') {
      btnElements[ob.number].classList.add('win');
      WinCountryName.textContent = `${data.name.common}`;
   }else { btnElements[ob.number].classList.add('lose'); }
   btnElements[ob.number].style.backgroundImage = `url(${data.flags.png})`;
   ob.number++;
}


let n = [];

const getCountryData1 = function () {
   const random = Math.floor(Math.random() * 51);
   const country = arrFlags[random];
   let result = '';
   if (n.length > 3) n = [];
   let Nrandom = Math.floor(Math.random() * 4);
   if (n[0] === 'win' || n[1] === 'win' || n[2] === 'win' || n[3] === 'win') {
      n.push('lose');
      result = 'lose';
   }
   else if (Nrandom === 3) {
      n.push('win');
      result = 'win';
   } 
   else if (n[0] === 'lose' && n[1] === 'lose' && n[2] === 'lose') {
      n.push('win');
      result = 'win';
   }else { // !!!!!! 
      n.push('lose');
      result = 'lose';
   }
   fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(request => request.json()).then(data => {
      renderCountry(data[0], result);
   }) .catch(()=> alert('Error! We cannot download all tools'));
}

// ? start of the game
getCountryData1();
getCountryData1();
getCountryData1();
getCountryData1();

const incorrect = function () {
   for (let i = 0; i != 4; i++) {
      if (btnElements[i].classList.contains('win')) {
         html = `<img class='sign' src="img/sign1.png" alt="" ></img>`;
         btnElements[i].insertAdjacentHTML('beforeend', html);
      } 
   }
   lifes--;
   if (lifes === 0) {
      document.querySelector('.score1').textContent = score;
      countriesContainer.insertAdjacentHTML('beforeend', '<button class="end">Check Results</button>');
      const resultButton = document.querySelector('.end');
      resultButton.addEventListener('click', function () {
         let scoreInformation = ``;
         if (score > 30) {
            scoreInformation = `😁 Congratulations, Your score is fantastic, you are better than 99% of other people.
            Your percent of accurecy is more than 95%`;
         }else if (score > 20 && score < 30) {
            scoreInformation = `😊 Congratulations, Your score is very good, you are better than approximetely 80% of other people.
            Your percent of accurecy is more than 80%`;
         }else if (score > 10 && score < 20) {
            scoreInformation = `🙂 Your score is normal, you are better than approximetely 70% of other people.
            Your percent of accurecy is more than 65%`;
         }else if (score > 5 && score < 10) {
            scoreInformation = `☹️ Your score is bad, you are better than approximetely 30% of other people.
            Your percent of accurecy is 35%`;
         } else {
            scoreInformation = `😓 Your score is bad, you are better than approximetely 10% of other people.
            Your percent of accurecy is less than 20%`;
         }
         document.querySelector('.score__information').textContent = scoreInformation;
         document.querySelector('.container__result').classList.remove('hidden');
      });
   } else {
      document.querySelector(`.heart${lifes}`).classList.add('hidden');
      for (let i = 0; i <= 3; i++) {
         btnElements[i].setAttribute('disabled', 'disabled');
      }
      countriesContainer.insertAdjacentHTML('beforeend', '<button class="next">Next Round</button>');
      const nextRoundButton = document.querySelector('.next');
      nextRoundButton.addEventListener('click', function () {
         for (let i = 0; i <= 3; i++) {
            if (btnElements[i].querySelector('.sign')) {
               btnElements[i].querySelector('.sign').remove();
            }
            if (btnElements[i].classList.contains('win')) {
               btnElements[i].classList.remove('win');
            } else if (btnElements[i].classList.contains('lose')) {
               btnElements[i].classList.remove('lose');
            }
            getCountryData1();
            btnElements[i].removeAttribute('disabled');
         }
         nextRoundButton.parentNode.removeChild(nextRoundButton);
      });
   }
}




const nextRaund = function () {
   score1.textContent = score;
   for (let i = 0; i <= 3; i++) { 
      btnElements[i].setAttribute('disabled', 'disabled');
   }
   countriesContainer.insertAdjacentHTML('beforeend', '<button class="next">Next Round</button>');
   const nextRoundButton = document.querySelector('.next');
   nextRoundButton.addEventListener('click', function () {
      for (let i = 0; i <= 3;i++){
      if (btnElements[i].querySelector('.sign')) {
            btnElements[i].querySelector('.sign').remove();}
      if (btnElements[i].classList.contains('win')){
         btnElements[i].classList.remove('win');
      } else if (btnElements[i].classList.contains('lose')) {
         btnElements[i].classList.remove('lose');}
      getCountryData1();
      btnElements[i].removeAttribute('disabled');
   }
   nextRoundButton.parentNode.removeChild(nextRoundButton);
});
}

// ? 1
const showResult1 = function () {

      let html = '';
      if (btnElements[0].classList.contains('win')) {
         html = `<img class='sign' src="img/sign1.png" alt="" ></img>`; score++;nextRaund();
      }
      else {
         html = `<img class='sign' src="img/sign2.png" alt="" ></img>`; incorrect();
      }
      btnElements[0].insertAdjacentHTML('beforeend', html);
}
btnElements[0].addEventListener('click', showResult1);
// ? 2
const showResult2 = function () {

      let html = '';
      if (btnElements[1].classList.contains('win')) {
         html = `<img class='sign' src="img/sign1.png" alt="" ></img>`; score++;nextRaund();
      }
      else {
         html = `<img class='sign' src="img/sign2.png" alt="" ></img>`; incorrect();
      }
      btnElements[1].insertAdjacentHTML('beforeend', html);
}
btnElements[1].addEventListener('click', showResult2);
// ? 3
const showResult3 = function () {

      let html = '';
      if (btnElements[2].classList.contains('win')) {
         html = `<img class='sign' src="img/sign1.png" alt="" ></img>`; score++;nextRaund();
      }
      else {
         html = `<img class='sign' src="img/sign2.png" alt="" ></img>`; incorrect();
      }
      btnElements[2].insertAdjacentHTML('beforeend', html);
}
btnElements[2].addEventListener('click', showResult3);
// ? 4
const showResult4 = function () {
      let html = '';
      if (btnElements[3].classList.contains('win')) {
         html = `<img class='sign' src="img/sign1.png" alt="" ></img>`; score++; nextRaund();
      }
      else {
         html = `<img class='sign' src="img/sign2.png" alt="" ></img>`; incorrect();
      }
      btnElements[3].insertAdjacentHTML('beforeend', html);
}
btnElements[3].addEventListener('click', showResult4);


// !! index.html 





