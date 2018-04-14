import Tone from 'tone';
import getSinger from './get-singer';
import getChorus from './get-chorus';

Tone.context.latencyHint = 'playback';

const numSingers = 8;

const singerPromises = [];
const singers = [];

for (let i = 1; i <= numSingers; i++) {
  singerPromises.push(getSinger(singers).then(singer => singers.push(singer)));
}

Promise.all(singerPromises).then(() => {
  console.log('scheduling piece');
  singers.forEach(singer => singer.schedulePiece());
  console.log('starting piece');
  Tone.Transport.start('+0.1');
});
