const resetBtn = document.getElementById("reset");
const container = document.querySelector(".container");
let flippedCards = [];
let lockBoard = false;

function shuffleCards() {
  let image = ["cat", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7"];
  let cards = [...image, ...image];

  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function createCards() {
  container.innerHTML = "";  // 清空容器
  flippedCards = [];
  lockBoard = false;

  let cards = shuffleCards();

  cards.forEach(name => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = name;

    let inner = document.createElement("div");
    inner.classList.add("inner");

    let front = document.createElement("img");
    front.src = `images/${name}.png`;
    front.classList.add("front");

    let back = document.createElement("img");
    back.src = `images/question.png`;
    back.classList.add("back");

    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);
    container.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (card.classList.contains("flipped")) return;

      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        let [first, second] = flippedCards;
        lockBoard = true;

        if (first.dataset.name === second.dataset.name) {
          lockBoard = false;
        } else {
          setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            lockBoard = false;
          }, 800);
        }

        flippedCards = [];
      }
    });
  });
}

// 頁面載入時先建卡
createCards();

// 綁定重新開始按鈕事件，只綁一次
resetBtn.addEventListener("click", () => {
  createCards();
});
