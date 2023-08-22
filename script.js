/* let wallpaper = Array.from(document.querySelector(".wallpaper").children);

let currentSlide =1;
// console.log(currentSlide)

let run = setInterval(() => {
  theCheeker();
  currentSlide++;
  console.log(currentSlide)
}, 5000);

theCheeker();

function theCheeker() {
  remove();
  wallpaper[currentSlide -1].classList.add("active");

  if (currentSlide === wallpaper.length) {
    currentSlide = 0;
  }
}
function remove() {
  wallpaper.forEach((img) => {
    img.classList.remove("active");
  });
}
*/

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

document.querySelector(".start-game").onclick = () => {
  let msg = prompt("write your name");
  let number = document.querySelector(".count-to-start span");

  if (msg === "" || msg === null) {
    document.querySelector(".name span").innerHTML = "unkwon";
    document.querySelector(".start-game .text").remove();
  } else {
    document.querySelector(".start-game .text").remove();
    document.querySelector(".name span").innerHTML = msg;
  }

  setTimeout(() => {
    document.querySelector(".start-game").remove();
    timeer();
  }, 4000);

  //A special function to reduce the number until the game starts
  function num() {
    number.innerHTML = parseInt(number.innerHTML) - 1;

    if (number.innerHTML === "0") {
      clearInterval(time);
    }
  }
  let time = setInterval(num, 1000);
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

let cards = Array.from(document.querySelector(".gamecontainer").children);
let duration = 1000;

let orderRange = [...Array.from(cards).keys()];

cards.forEach((card, index) => {
  shuffle(orderRange);
  card.style.order = orderRange[index];

  showCards(card);

  card.addEventListener("click", function () {
    flipped(card);
    win(card);
  });
});

function showCards(ele) {
  ele.classList.add("isflip");

  setTimeout(() => {
    ele.classList.remove("isflip");
  }, 1000);
}

function win(selected) {
  let matchedCards = cards.filter((selected) =>
    selected.classList.contains("match")
  );

  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      document.querySelector(".gameover").classList.add("working");
    }, duration);
    clearInterval(timeCount);
  }
}

function timeer() {
  // About countDawn mithods
  let minutes = document.querySelector(".minuts");
  let seconds = document.querySelector(".secounds");
  // .................................

  /*  i write globalThis to (timeCount) variable to make it global 
    to use it in win function to use clearInterval*/
  globalThis.timeCount = setInterval(() => {
    seconds.innerHTML = parseInt(seconds.innerHTML) + 1;
    if (seconds.innerHTML === "60") {
      seconds.innerHTML = 1;
      minutes.innerHTML = parseInt(minutes.innerHTML) + 1;
    }
  }, 1000);
}

function flipped(selectedCard) {
  selectedCard.classList.add("isflip");

  let allCards = cards.filter((selected) =>
    selected.classList.contains("isflip")
  );

  // if i clicked on 2 cards ...
  if (allCards.length === 2) {
    stopClicking();
    matchCards(allCards[0], allCards[1]);
  }
}

function matchCards(card1, card2) {
  let tries = document.querySelector(".try span");
  if (card1.dataset.card === card2.dataset.card) {
    card1.classList.remove("isflip");
    card2.classList.remove("isflip");

    card1.classList.add("match");
    card2.classList.add("match");
  } else {
    setTimeout(() => {
      card1.classList.remove("isflip");
      card2.classList.remove("isflip");
      tries.innerHTML = parseInt(tries.innerHTML) + 1;
    }, duration);
  }
}

function stopClicking() {
  document.querySelector(".gamecontainer").classList.add("stop");
  setTimeout(() => {
    document.querySelector(".gamecontainer").classList.remove("stop");
  }, duration);
}

function shuffle(Array) {
  let currentCard = Array.length;
  let temp;
  let random;

  while (currentCard > 0) {
    random = Math.floor(Math.random() * currentCard);
    currentCard--;

    temp = Array[currentCard];
    Array[currentCard] = Array[random];
    Array[random] = temp;
  }
  return Array;
}

document.querySelector(".playagain").onclick = () => {
  location.reload();
};
