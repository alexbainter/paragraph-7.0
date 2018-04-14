import Tone from 'tone';
import piece from './piece';
import notes from './notes';
import getChorus from './get-chorus';
import getRandomNIndices from './util/get-random-n-indices';

const SAMPLE_LENGTH_MS = 9000;

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
      note => notesBeingSung.includes(note) && note !== currentNote
    );
    if (possibleNextNotes.length === 0) {
      possibleNextNotes = notes.filter(note => note !== currentNote);
    }
    let note = getRandomNote(possibleNextNotes);
    return note;
  };

  const singNote = (note, length, loud = false) => {
    currentNote = note;
    let volume = -10;
    if (loud) {
      volume = 0;
    }
    console.log(`Loud? ${loud}`);
    instrument.set({ volume });
    instrument.triggerAttackRelease(note, length / 1000);
  };

  const singLine = (line, length) => {
    const note = getNextNote();
    let totalBreathTime = 0;
    const loudRepitionIndicies = getRandomNIndices(
      line.numberOfLoudRepitions,
      line.numberOfRepetitions
    );
    for (let i = 1; i <= line.numberOfRepetitions; i++) {
      const wait = getRandomWaitTimeBetweenRepititions();
      Tone.Transport.schedule(() => {
        singNote(note, length, loudRepitionIndicies.includes(i));
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
      window.chorus = chorus;
      resolve(singer(singers, chorus));
    });
  });

export default getSinger;
