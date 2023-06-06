import Image from "next/image";
import React from "react";

export interface FlipCardProps {
  data?: string;
  key: number;
}

export default function FlipCard(FlipCardProps: FlipCardProps) {
  const { key } = FlipCardProps;
  return (
    <div key={key} className="cursor-pointer group ">
      <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
        <div className=" backface-hidden w-full h-full">
          {/* back content */}
          <Image
            className="relative"
            src="card.svg"
            alt="Next.js Logo"
            width={280}
            height={37}
          />
        </div>
        <div className="absolute my-rotate-y-180 backface-hidden w-full h-full overflow-hidden">
          {/* front content */}
          <Image
            className=""
            src="card.svg"
            alt="Next.js Logo"
            width={280}
            height={37}
          />
        </div>
      </div>
    </div>
  );
}
