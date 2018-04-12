import Tone from "tone";
import piece from "./piece";
import notes from "./notes";
import getChorus from "./get-chorus";

const getRandomNote = potentialNotes =>
  potentialNotes[Math.floor(Math.random() * potentialNotes.length)];

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
      Tone.Transport.schedule(() => {
        singNote(note, length);
      }, totalBreathTime / 1000);
      totalBreathTime += 9000;
    }
  };

  const schedulePiece = () => {
    let totalBreathTime = 0;
    piece.forEach(line => {
      const wait = Math.random() * (10000 - 1000) + 1000;
      console.log(`Scheduling line for ${totalBreathTime / 1000}`);
      Tone.Transport.schedule(() => {
        console.log("singing line");
        singLine(line, 9000);
      }, totalBreathTime / 1000);
      totalBreathTime += 9000 * line.numberOfRepetitions + wait;
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
