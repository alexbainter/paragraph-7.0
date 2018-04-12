import Tone from 'tone';
import piece from './piece';
import notes from './notes';
import getChorus from './get-chorus';

const SAMPLE_LENGTH_MS = 8000;

const getRandomNote = potentialNotes =>
  potentialNotes[Math.floor(Math.random() * potentialNotes.length)];

const makeGetRandomWaitTime = (min, max) => () =>
  Math.random() * (max - min) + min;

const getRandomWaitTimeBetweenLines = makeGetRandomWaitTime(100, 20000);
const getRandomWaitTimeBetweenRepititions = makeGetRandomWaitTime(200, 800);

const singer = (singers, instrument) => {
  let currentNote;

  const getNextNote = () => {
    const notesBeingSung = singers.map(({ getCurrentNote }) =>
      getCurrentNote()
    );
    let possibleNextNotes = notes.filter(
      note => !notesBeingSung.includes(note)
    );
    if (possibleNextNotes.length === 0) {
      possibleNextNotes = notes;
    }
    let note = getRandomNote(possibleNextNotes);
    while (note === currentNote) {
      note = getRandomNote(possibleNextNotes);
    }
    return note;
  };

  const singNote = (note, length) => {
    currentNote = note;
    instrument.triggerAttackRelease(note, length / 1000);
  };

  const singLine = (line, length) => {
    const note = getNextNote();
    let totalBreathTime = 0;
    for (let i = 1; i <= line.numberOfRepetitions; i++) {
      const wait = getRandomWaitTimeBetweenRepititions();
      Tone.Transport.schedule(() => {
        singNote(note, length);
      }, Tone.now() + totalBreathTime / 1000);
      totalBreathTime += SAMPLE_LENGTH_MS + wait;
    }
  };

  const schedulePiece = () => {
    let totalBreathTime = 0;
    piece.forEach(line => {
      const wait = getRandomWaitTimeBetweenLines();
      Tone.Transport.schedule(() => {
        console.log('singing line');
        singLine(line, SAMPLE_LENGTH_MS);
      }, Tone.now() + totalBreathTime / 1000);
      totalBreathTime += SAMPLE_LENGTH_MS * line.numberOfRepetitions + wait;
    });
  };

  return {
    getCurrentNote: () => currentNote,
    schedulePiece,
  };
};

const getSinger = singers =>
  new Promise((resolve, reject) => {
    getChorus().then(chorus => {
      resolve(singer(singers, chorus));
    });
  });

export default getSinger;
