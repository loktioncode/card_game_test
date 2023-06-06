import React, { useEffect, useState, useRef } from "react";
import Card from "./card/Card";

interface CardType {
  type: number;
  image: string;
}

const uniqueElementsArray: CardType[] = [
  {
    type: 1,
    image: "/images/clothes/card-1-turned.svg",
  },
  {
    type: 2,
    image: "/images/clothes/card-2-turned.svg",
  },
  {
    type: 3,
    image: "/images/clothes/card-3-turned.svg",
  },
  {
    type: 4,
    image: "/images/clothes/card-4-turned.svg",
  },
  {
    type: 5,
    image: "/images/clothes/card-5-turned.svg",
  },

];

function shuffleCards(array: CardType[]) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const CardGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(
    shuffleCards(uniqueElementsArray.concat(uniqueElementsArray))
  );
  console.log(cards)
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<Record<string, boolean>>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
     10
  );
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore.toString());
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
  
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current as NodeJS.Timeout);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeoutRef: NodeJS.Timeout | null = null;
    if (openCards.length === 2) {
      timeoutRef = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeoutRef as NodeJS.Timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
  };

  return (
    <div className="App">
  
      <div className="container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(card)}
            isFlipped={checkIsFlipped(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {/* {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )} */}
        </div>
        <div className="restart">
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart
          </button>
        </div>
      </footer>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Hurray!!! You completed the challenge</h2>
            <p className="text-sm mb-4">
              You completed the game in {moves} moves. Your best score is {bestScore} moves.
            </p>
            <div className="text-center">
              <button
                onClick={handleRestart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGame;

