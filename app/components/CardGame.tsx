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

const happyElements: CardType[] = [
  {
    type: 1,
    image: "/images/happy/card-1-complete.svg",
  },
  {
    type: 2,
    image: "/images/happy/card-2-complete.svg",
  },
  {
    type: 3,
    image: "/images/happy/card-3-complete.svg",
  },
  {
    type: 4,
    image: "/images/happy/card-4-complete.svg",
  },
  {
    type: 5,
    image: "/images/happy/card-5-complete.svg",
  },
  {
    type: 1,
    image: "/images/happy/card-6-complete.svg",
  },
  {
    type: 2,
    image: "/images/happy/card-7-complete.svg",
  },
  {
    type: 3,
    image: "/images/happy/card-8-complete.svg",
  },
  {
    type: 4,
    image: "/images/happy/card-9-complete.svg",
  },
  {
    type: 5,
    image: "/images/happy/card-10-complete.svg",
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

  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<Record<string, boolean>>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const maxMoves = 14;

  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };
  const saveGameState = (state: any) => {
    localStorage.setItem("gameState", JSON.stringify(state));
  };

  const loadGameState = () => {
    const savedState = localStorage.getItem("gameState");
    return savedState ? JSON.parse(savedState) : null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkCompletion = () => {
    if (
      (clearedCards &&
        Object.keys(clearedCards).length === uniqueElementsArray.length) ||
      maxMoves === moves
    ) {
      setShowModal(true);
     // Calculate the best score
     const newBestScore = Math.min(bestScore || Infinity, moves) * 2;
     setBestScore(newBestScore);
     localStorage.setItem("bestScore", newBestScore.toString());
    }
  };

  const check_If_TypeIsSame = () => {
    const [first, second] = openCards;

    enable();
    if (cards[first].type === cards[second].type) {
      const typeString = cards[first].type.toString();
      setClearedCards((prev) => ({ ...prev, [typeString]: true }));
      setOpenCards([]);

      // Save the game state
      saveGameState({
        openCards: [],
        clearedCards: { ...clearedCards, [typeString]: true },
        moves,
      });
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
      let userScore = localStorage.getItem("bestScore");

      // Save the game state
      saveGameState({
        openCards: [...openCards, index],
        clearedCards: { ...clearedCards },
        moves: moves + 1,
        userScore,
      });
    } else {
      clearTimeout(timeout.current as NodeJS.Timeout);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeoutRef: NodeJS.Timeout | null = null;
    if (openCards.length === 2) {
      timeoutRef = setTimeout(check_If_TypeIsSame, 300);
    }
    return () => {
      clearTimeout(timeoutRef as NodeJS.Timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [checkCompletion, clearedCards, moves]);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType) => {
    const typeString = card.type.toString();
    return Boolean(clearedCards && clearedCards[typeString]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);

    // Shuffle uniqueElementsArray and happyElements
    const shuffledUniqueElements =
      shuffleCards(uniqueElementsArray).concat(uniqueElementsArray);

    // Generate a random number (0 or 1) to determine which set of elements to use alone
    const randomPick = Math.floor(Math.random() * 3);

    let shuffledCards;
    if (randomPick === 0) {
      // Use shuffledUniqueElements alone
      shuffledCards = shuffledUniqueElements;
    } else {
      // Use shuffledHappyElements alone
      shuffledCards = happyElements;
    }
    // Set the shuffled cards as the new state
    setCards(shuffledCards);

    // Clear the saved game state
    localStorage.removeItem("gameState");
  };

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setOpenCards(savedState.openCards);
      setClearedCards(savedState.clearedCards);
      setMoves(savedState.moves);
      setBestScore(savedState.bestScore);
    }
  }, []);

  return (
    <div>
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
        <legend className="bg-white w-11/12 rounded-lg flex flex-col mt-[-20px]">
          <div className="flex flex-col lg:flex-row items-center justify-around p-8">
            <div>
              <h4 className="text-4xl  font-bold w-full text-start">
                Highest Score: {bestScore}
              </h4>
            </div>
            <div className="flex flex-col">
              <h4 className="text-4xl  font-bold w-full text-start">
                {moves} moves
              </h4>
            </div>
            <button
              onClick={handleRestart}
              className="bg-[#52B1B3] text-white font-bold p-6 rounded-2xl w-2/12"
            >
              Restart
            </button>
          </div>
        </legend>
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow">
              {maxMoves === moves ? (
                <h2 className="text-xl font-bold mb-4">
                  Oops! you are out of moves!
                </h2>
              ) : (
                <h2 className="text-2xl font-bold mb-4">
                  Hurray!!! You completed the challenge
                </h2>
              )}
              <p className="text-lg mb-4">
                You completed the game in {moves} moves. Your best score is{" "}
                {bestScore}
              </p>
              <div className="text-center">
                <button
                  onClick={handleRestart}
                  className="bg-[#52B1B3] text-white font-bold py-2 px-4 rounded"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGame;
