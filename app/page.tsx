"use client";
import classNames from "classnames";
import CardGame from "./components/CardGame";
import { nanum_Pen_Script } from "./utils/fonts";

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-4 lg:flex-row lg:pl-20">
      <div className="mr-10 mt-[-40px]">
        <CardGame />
      </div>

      <div className="flex lg:flex-col justify-between items-center w-full lg:w-4/12">
        <div className="line rotate-60 pl-10 pb-10">
          <h1
            className={classNames(
              "text-3xl font_nanum py-14 ml-28 float-right w-5/12 ",
              nanum_Pen_Script.className
            )}
          >
            Mix & match the tiles to reveal a surprise!
          </h1>
        </div>
        <div className="sm:pt-5 md:pt-5 pl-4 lg:pl-28">
          <h2 className="lg:text-5xl font_poppins mt-6 md:mt-44 leading-snug font-bold">
            The perfect place to buy & sell premium, pre-loved fashion for
            little ones!
          </h2>
          <h3 className="text-3xl pt-6 font_poppins">
            Delivering something sweet, real soon! Join the hive to stay in the
            loop.
          </h3>
        </div>
      </div>
    </main>
  );
}
