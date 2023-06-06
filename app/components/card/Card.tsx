import React from "react";
import Image from "next/image";

import classnames from "classnames";
import pokeball from "./images/pokeball.png";
import "./card.css";

interface CardProps {
  onClick: (index: number) => void;
  card: {
    image: string;
    type: number;
  };
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
}

const Card: React.FC<CardProps> = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  console.log(index, card.type)

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <Image
          className=""
          src="card.svg"
          alt="Next.js Logo"
          width={280}
          height={37}
        />
      </div>
      <div className="card-face card-back-face">
        <Image
          className=""
          src={card.image}
          alt={`${card.image} image`}
          width={280}
          height={37}
        />
      </div>
    </div>
  );
};

export default Card;
