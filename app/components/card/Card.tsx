import React from "react";
import Image from "next/image";

import classnames from "classnames";

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

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div
        className={classnames("card-face card-font-face", {
          "border-2 border-green-500": isInactive,
        })}
      >
        <Image
          className=""
          src={!isInactive ? "card.svg" : card.image}
          alt="Next.js Logo"
          width={280}
          height={37}
        />
      </div>
      <div className="card-face card-back-face">
        <Image
          className=""
          src={!isFlipped ? '' : card.image}
          alt={``}
          width={280}
          height={37}
        />
      </div>
    </div>
  );
};

export default Card;
