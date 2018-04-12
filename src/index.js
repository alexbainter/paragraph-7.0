import Tone from "tone";
import addSinger from "./add-singer";

Tone.context.latencyHint = "playback";

const singers = [];

const numSingers = 10;

for (let i = 1; i <= numSingers; i++) {
  const singer = addSinger(singers);
  singer.schedulePiece();
}

Tone.Transport.start("+0.5");
