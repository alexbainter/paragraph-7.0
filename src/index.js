import Tone from "tone";
import addSinger from "./add-singer";

const singers = [];

const numSingers = 5;

for (let i = 1; i <= numSingers; i++) {
  const singer = addSinger(singers);
  singer.schedulePiece();
}

Tone.Transport.start();
