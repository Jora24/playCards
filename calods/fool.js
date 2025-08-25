const foolCalod = [
  { name: "ace", size: 14 },
  { name: "king", size: 13 },
  { name: "queen", size: 12 },
  { name: "jack", size: 11 },
  { name: "ten", size: 10 },
  { name: "nine", size: 9 },
  { name: "eight", size: 8 },
  { name: "seven", size: 7 },
  { name: "six", size: 6 }
];

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

function createDeck() {
  const deck = [];
  for (const card of foolCalod) {
    for (const suit of suits) {
      deck.push({
        name: card.name,
        size: card.size,
        suit
      });
    }
  }
  return deck;
}

module.exports = { foolCalod, suits, createDeck };
