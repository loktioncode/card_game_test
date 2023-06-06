import {  Poppins, Nanum_Pen_Script} from 'next/font/google';

export const poppins = Poppins({
  weight: ["500"],
  style:['normal'],
  subsets:["devanagari"]
});

export const nanum_Pen_Script = Nanum_Pen_Script({
  weight: ["400"],
  style:['normal'],
  subsets:['latin']
});
